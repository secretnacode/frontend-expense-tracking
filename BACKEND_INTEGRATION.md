# Smart Expense Tracker - Backend API Integration Guide

This guide helps Laravel developers integrate with the Vue 3 frontend to support the three key technical challenges.

## 🌍 Environment Setup

Add to your `.env`:

```env
# WebSocket Configuration
REVERB_APP_ID=your-id
REVERB_APP_KEY=your-key
REVERB_CLUSTER=mt1
REVERB_HOST=localhost
REVERB_PORT=8080
REVERB_SCHEME=http

# AI Processing
OPENAI_API_KEY=your-key
OPENAI_MODEL=gpt-4-vision

# File Storage
FILESYSTEM_DISK=local
RECEIPT_STORAGE_PATH=storage/receipts
CSV_STORAGE_PATH=storage/csv_imports

# Queue Configuration
QUEUE_CONNECTION=database
```

## 📤 Challenge 1: Image Upload & OCR Processing

### Routes

```php
// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/receipts/upload', [ReceiptController::class, 'upload']);
    Route::post('/csv/upload', [CSVController::class, 'upload']);
});
```

### Controller Implementation

```php
// app/Http/Controllers/ReceiptController.php

namespace App\Http\Controllers;

use App\Models\Receipt;
use App\Jobs\ProcessReceipt;
use Illuminate\Http\Request;

class ReceiptController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|image|max:10240', // 10MB
        ]);

        // Store file securely (NOT publicly accessible)
        $path = $request->file('file')->store(
            'receipts/' . auth()->id(),
            'local'
        );

        // Create receipt record
        $receipt = Receipt::create([
            'user_id' => auth()->id(),
            'file_path' => $path,
            'file_name' => $request->file('file')->getClientOriginalName(),
            'status' => 'pending',
        ]);

        // Dispatch async job
        ProcessReceipt::dispatch($receipt)
            ->onQueue('receipts')
            ->delay(now());

        return response()->json([
            'jobId' => $receipt->id,
            'receiptId' => $receipt->id,
            'status' => 'pending',
        ], 202); // Accepted
    }
}
```

### Image Pre-processing

```php
// app/Services/ImagePreprocessingService.php

namespace App\Services;

use Intervention\Image\ImageManager;

class ImagePreprocessingService
{
    public function preprocess($imagePath)
    {
        $manager = new ImageManager(new Driver);
        $image = $manager->read(storage_path("app/$imagePath"));

        // 1. Upscale low-res images
        if ($image->width() < 800) {
            $image->scale(width: 1600);
        }

        // 2. Enhance contrast for OCR
        $image->contrast(25);

        // 3. Sharpen for better text clarity
        $image->sharpen(1.5);

        // 4. Correct rotation if needed (EXIF data)
        $image->orientate();

        // 5. Remove noise
        $image->blur(0.5);

        $processedPath = "processed/" . basename($imagePath);
        Storage::disk('local')->put($processedPath, $image->encode());

        return $processedPath;
    }
}
```

### OCR + AI Extraction with Structured JSON

````php
// app/Jobs/ProcessReceipt.php

namespace App\Jobs;

use App\Models\Receipt;
use App\Services\ImagePreprocessingService;
use Illuminate\Contracts\Queue\ShouldQueue;

class ProcessReceipt implements ShouldQueue
{
    public function __construct(public Receipt $receipt) {}

    public function handle()
    {
        $this->receipt->update(['status' => 'processing']);

        try {
            // Step 1: Pre-process image
            $preprocessing = new ImagePreprocessingService();
            $processedPath = $preprocessing->preprocess($this->receipt->file_path);

            // Notify frontend: 30% progress
            $this->notifyProgress(30);

            // Step 2: Extract with AI (force JSON structure)
            $extractedData = $this->extractWithAI(
                storage_path("app/$processedPath")
            );

            // Notify frontend: 70% progress
            $this->notifyProgress(70);

            // Step 3: Validate extracted data
            $expenses = $this->validateAndStructure($extractedData);

            // Step 4: Save to database
            foreach ($expenses as $expenseData) {
                Expense::create([
                    'user_id' => $this->receipt->user_id,
                    'receipt_id' => $this->receipt->id,
                    'date' => $expenseData['date'],
                    'amount' => $expenseData['amount'],
                    'category' => $expenseData['category'],
                    'vendor' => $expenseData['vendor'],
                    'description' => $expenseData['description'] ?? '',
                    'is_verified' => false,
                    'original_data' => $expenseData, // Store for UI reference
                ]);
            }

            $this->receipt->update(['status' => 'completed']);

            // Notify frontend: 100% + send expenses
            $this->notifyComplete($this->receipt->expenses);

        } catch (Exception $e) {
            $this->receipt->update([
                'status' => 'failed',
                'error_message' => $e->getMessage(),
            ]);
            $this->notifyError($e->getMessage());
        }
    }

    private function extractWithAI($imagePath)
    {
        $client = \OpenAI::client();

        // Force structured JSON response
        $prompt = <<<PROMPT
Analyze this receipt image and extract ALL transactions.

Return ONLY valid JSON (no markdown, no explanation):
{
  "transactions": [
    {
      "date": "YYYY-MM-DD",
      "amount": 12.99,
      "category": "Food & Dining|Transportation|Shopping|...",
      "vendor": "Store/Restaurant Name",
      "description": "Item description if available"
    }
  ],
  "confidence": 0.95
}

If data is unclear, make your best estimate and note low confidence.
PROMPT;

        $response = $client->messages()->create([
            'model' => 'gpt-4-vision',
            'max_tokens' => 1024,
            'messages' => [
                [
                    'role' => 'user',
                    'content' => [
                        [
                            'type' => 'image',
                            'source' => [
                                'type' => 'base64',
                                'media_type' => 'image/jpeg',
                                'data' => base64_encode(
                                    file_get_contents($imagePath)
                                ),
                            ],
                        ],
                        [
                            'type' => 'text',
                            'text' => $prompt,
                        ],
                    ],
                ],
            ],
        ]);

        $jsonString = $response->content[0]->text;

        // Clean up potential markdown wrapping
        $jsonString = preg_replace('/```json\n?|\n?```/', '', $jsonString);

        return json_decode($jsonString, true);
    }

    private function validateAndStructure($data)
    {
        if (empty($data['transactions'])) {
            throw new Exception('No transactions found in receipt');
        }

        // Validate each transaction
        return array_map(function ($txn) {
            // Validate date format
            if (!strtotime($txn['date'])) {
                throw new Exception('Invalid date format');
            }

            // Ensure amount is numeric
            if (!is_numeric($txn['amount']) || $txn['amount'] <= 0) {
                throw new Exception('Invalid amount');
            }

            return [
                'date' => $txn['date'],
                'amount' => (float) $txn['amount'],
                'category' => $this->normalizeCategory($txn['category']),
                'vendor' => trim($txn['vendor']),
                'description' => trim($txn['description'] ?? ''),
            ];
        }, $data['transactions']);
    }

    private function normalizeCategory($category)
    {
        $validCategories = [
            'Food & Dining', 'Transportation', 'Shopping',
            'Entertainment', 'Utilities', 'Healthcare',
            'Office Supplies', 'Travel', 'Subscriptions', 'Other'
        ];

        // Simple matching
        foreach ($validCategories as $valid) {
            if (stripos($category, $valid) !== false) {
                return $valid;
            }
        }

        return 'Other';
    }

    private function notifyProgress($percentage)
    {
        // Use Laravel Reverb to broadcast progress
        broadcast(new ReceiptProcessingUpdated(
            $this->receipt,
            $percentage
        ));
    }

    private function notifyComplete($expenses)
    {
        broadcast(new ReceiptProcessingCompleted(
            $this->receipt,
            $expenses
        ));
    }

    private function notifyError($error)
    {
        broadcast(new ReceiptProcessingError(
            $this->receipt,
            $error
        ));
    }
}
````

## 🔄 Challenge 2: Async + WebSocket Real-Time Updates

### Events & Broadcasting

```php
// app/Events/ReceiptProcessingUpdated.php
namespace App\Events;

use App\Models\Receipt;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ReceiptProcessingUpdated implements ShouldBroadcast
{
    use InteractsWithSockets;

    public function __construct(
        public Receipt $receipt,
        public int $progress
    ) {}

    public function broadcastOn(): Channel
    {
        return new Channel("user.{$this->receipt->user_id}");
    }

    public function broadcastAs(): string
    {
        return 'processing_update';
    }

    public function broadcastWith(): array
    {
        return [
            'jobId' => $this->receipt->id,
            'progress' => $this->progress,
        ];
    }
}

// app/Events/ReceiptProcessingCompleted.php
class ReceiptProcessingCompleted implements ShouldBroadcast
{
    use InteractsWithSockets;

    public function __construct(
        public Receipt $receipt,
        public $expenses
    ) {}

    public function broadcastOn(): Channel
    {
        return new Channel("user.{$this->receipt->user_id}");
    }

    public function broadcastAs(): string
    {
        return 'processing_complete';
    }

    public function broadcastWith(): array
    {
        return [
            'jobId' => $this->receipt->id,
            'expenses' => $this->expenses->map(fn($e) => [
                'id' => $e->id,
                'date' => $e->date->format('Y-m-d'),
                'amount' => $e->amount,
                'category' => $e->category,
                'vendor' => $e->vendor,
                'description' => $e->description,
                'receiptId' => $e->receipt_id,
                'isVerified' => $e->is_verified,
                'originalData' => $e->original_data,
            ])->toArray(),
        ];
    }
}

class ReceiptProcessingError implements ShouldBroadcast
{
    use InteractsWithSockets;

    public function __construct(
        public Receipt $receipt,
        public string $error
    ) {}

    public function broadcastOn(): Channel
    {
        return new Channel("user.{$this->receipt->user_id}");
    }

    public function broadcastAs(): string
    {
        return 'processing_error';
    }

    public function broadcastWith(): array
    {
        return [
            'jobId' => $this->receipt->id,
            'error' => $this->error,
        ];
    }
}
```

### Install & Configure Reverb

```bash
php artisan reverb:install

# Update .env
REVERB_APP_ID=expense-tracker
REVERB_SCHEME=http
REVERB_HOST=127.0.0.1
REVERB_PORT=8080
```

Start Reverb server:

```bash
php artisan reverb:start
```

## 📊 Challenge 3: Security & Data Privacy

### Policies

```php
// app/Policies/ExpensePolicy.php

namespace App\Policies;

use App\Models\User;
use App\Models\Expense;

class ExpensePolicy
{
    public function view(User $user, Expense $expense): bool
    {
        return $user->id === $expense->user_id;
    }

    public function update(User $user, Expense $expense): bool
    {
        return $user->id === $expense->user_id;
    }

    public function delete(User $user, Expense $expense): bool
    {
        return $user->id === $expense->user_id;
    }
}
```

### Secure File Storage

```php
// Don't expose files publicly!
// Good: storage/receipts/user-123/receipt.jpg
// Bad: public/receipts/receipt.jpg

// Instead, provide secure downloads:
Route::get('/receipts/{expense}', function (Expense $expense) {
    $this->authorize('view', $expense);
    return Storage::disk('local')->download(
        $expense->receipt->file_path
    );
});
```

### API Endpoints Security

```php
// app/Http/Controllers/ExpenseController.php

Route::middleware('auth:sanctum')->group(function () {
    // Only return user's own expenses
    Route::get('/expenses', function (Request $request) {
        return response()->json([
            'expenses' => auth()->user()->expenses()
                ->where('is_verified', true)
                ->get()
                ->map(fn($e) => [
                    'id' => $e->id,
                    'date' => $e->date->format('Y-m-d'),
                    'amount' => $e->amount,
                    'category' => $e->category,
                    'vendor' => $e->vendor,
                    'description' => $e->description,
                    'receiptId' => $e->receipt_id,
                    'isVerified' => $e->is_verified,
                    'originalData' => $e->original_data,
                ]),
            'financialData' => [
                'totalSpending' => auth()->user()->expenses()
                    ->where('is_verified', true)
                    ->sum('amount'),
                'categoryBreakdown' => auth()->user()->expenses()
                    ->where('is_verified', true)
                    ->groupBy('category')
                    ->map->sum('amount'),
                'monthlySpending' => auth()->user()->expenses()
                    ->where('is_verified', true)
                    ->groupBy(DB::raw('DATE_FORMAT(date, "%Y-%m")'))
                    ->map->sum('amount'),
            ]
        ]);
    });

    // Update expense (with authorization)
    Route::patch('/expenses/{expense}', function (Expense $expense, Request $request) {
        $this->authorize('update', $expense);

        $expense->update($request->only([
            'date', 'amount', 'category', 'vendor', 'description'
        ]));

        return response()->json($expense);
    });
});
```

## 📧 CSV Import

```php
// app/Jobs/ProcessCSV.php

namespace App\Jobs;

use App\Models\Receipt;
use Illuminate\Contracts\Queue\ShouldQueue;

class ProcessCSV implements ShouldQueue
{
    public function __construct(public Receipt $receipt) {}

    public function handle()
    {
        $this->receipt->update(['status' => 'processing']);

        try {
            $path = storage_path("app/{$this->receipt->file_path}");
            $rows = $this->parseCSV($path);

            $this->receipt->update(['status' => 'completed']);

            broadcast(new ReceiptProcessingCompleted(
                $this->receipt,
                $this->createExpenses($rows)
            ));

        } catch (Exception $e) {
            $this->receipt->update(['status' => 'failed']);
            broadcast(new ReceiptProcessingError($this->receipt, $e->getMessage()));
        }
    }

    private function parseCSV($path)
    {
        $rows = [];
        if (($handle = fopen($path, 'r')) !== false) {
            $headers = null;
            while (($data = fgetcsv($handle)) !== false) {
                if ($headers === null) {
                    $headers = $data;
                } else {
                    $rows[] = array_combine($headers, $data);
                }
            }
            fclose($handle);
        }
        return $rows;
    }

    private function createExpenses($rows)
    {
        return array_map(function ($row) {
            return Expense::create([
                'user_id' => $this->receipt->user_id,
                'receipt_id' => $this->receipt->id,
                'date' => $row['date'] ?? $row['Date'] ?? now(),
                'amount' => (float) ($row['amount'] ?? $row['Amount'] ?? 0),
                'vendor' => $row['merchant'] ?? $row['Merchant'] ?? 'Unknown',
                'category' => 'Other',
                'description' => $row['description'] ?? '',
                'is_verified' => false,
                'original_data' => $row,
            ]);
        }, $rows);
    }
}
```

## 🧪 Testing

```php
// tests/Feature/ReceiptUploadTest.php

use Tests\TestCase;

class ReceiptUploadTest extends TestCase
{
    public function test_receipt_upload_creates_processing_job()
    {
        $user = User::factory()->create();
        $file = UploadedFile::fake()->image('receipt.jpg');

        $response = $this->actingAs($user, 'sanctum')
            ->json('POST', '/api/receipts/upload', ['file' => $file]);

        $response->assertStatus(202);
        $this->assertDatabaseHas('receipts', [
            'user_id' => $user->id,
            'status' => 'pending',
        ]);
    }

    public function test_user_cannot_view_other_users_expenses()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $expense = Expense::factory()->create(['user_id' => $user1->id]);

        $response = $this->actingAs($user2, 'sanctum')
            ->json('GET', "/api/expenses/{$expense->id}");

        $response->assertStatus(403);
    }
}
```

## 🚀 Deployment

```bash
# Install dependencies
composer install

# Run migrations
php artisan migrate

# Link storage
php artisan storage:link

# Start queue worker
php artisan queue:work --queue=receipts

# Start WebSocket server
php artisan reverb:start --host=0.0.0.0 --port=8080
```

## 📚 Summary

This integration provides:

1. **Image preprocessing** for OCR accuracy
2. **Async job queues** for responsive UX
3. **WebSocket broadcasting** for real-time updates
4. **User policies** for data privacy
5. **Structured JSON extraction** from AI

The frontend handles the UI/UX, while this backend handles processing, storage, and security.
