# Smart Expense Tracker - System Architecture

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Vue 3)                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         Smart Expense Tracker UI                    │    │
│  │  ┌──────────────┬──────────────┬──────────────┐     │    │
│  │  │  Navigation  │   Upload UI  │  Dashboard   │     │    │
│  │  └──────────────┴──────────────┴──────────────┘     │    │
│  │  ┌────────────────────────────────────────────┐     │    │
│  │  │  Data Correction & Verification Interface  │     │    │
│  │  └────────────────────────────────────────────┘     │    │
│  │  ┌────────────────────────────────────────────┐     │    │
│  │  │   Financial Assistant Chat Interface       │     │    │
│  │  └────────────────────────────────────────────┘     │    │
│  └─────────────────────────────────────────────────────┘    │
│              Pinia Store (State Management)                  │
│             WebSocket Connection (Real-time)                │
└─────────────────────────────────────────────────────────────┘
                            ↕↕ API & WebSocket
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Laravel + AI)                      │
│ ┌──────────────────────────────────────────────────────┐    │
│ │         receiptUpload / CSVUpload API               │    │
│ │         ↓                                            │    │
│ │  ProcessReceipt Job (Queue)                         │    │
│ │  ├─ Image Preprocessing (Intervention)             │    │
│ │  ├─ OCR + AI Extraction (OpenAI GPT-4 Vision)      │    │
│ │  ├─ Data Validation & Structuring                  │    │
│ │  └─ Database Storage                               │    │
│ │         ↓                                            │    │
│ │  Real-time Broadcast (Laravel Reverb)              │    │
│ │  ├─ processing_update (progress %)                 │    │
│ │  ├─ processing_complete (extracted data)           │    │
│ │  └─ processing_error (error messages)              │    │
│ └──────────────────────────────────────────────────────┘    │
│ ┌──────────────────────────────────────────────────────┐    │
│ │  /api/expenses - Fetch verified expenses           │    │
│ │  /api/expenses/{id} - Update expense (auth)        │    │
│ │  /api/assistant/chat - AI financial insights       │    │
│ └──────────────────────────────────────────────────────┘    │
│                                                              │
│ Database: Receipts, Expenses, Users                         │
│ Storage: Secure receipt images (not public)                 │
│ Queue: Background job processing                            │
│ WebSocket: Real-time progress updates                       │
└─────────────────────────────────────────────────────────────┘
```

## 🔀 Data Flow Diagrams

### Receipt Upload & Processing Flow

```
User selects Image
        ↓
ReceiptUpload.vue validates file (type, size)
        ↓
store.uploadReceipt(file)
    → POST /api/receipts/upload
        ↓
Backend creates Receipt record
        ↓
Dispatch ProcessReceipt job → Queue
        ↓
Return jobId immediately (202 Accepted)
        ↓
Frontend stores job in processingJobs array
ProcessingStatus.vue displays "Pending" status
        ↓
Backend starts processing:
  1. Image preprocessing (enhance for OCR)
  2. Send to OpenAI Vision API
  3. Parse JSON response
  4. Validate data structure
        ↓
WebSocket Event: "processing_update" (progress: 30%)
        ↓
Frontend updates progress bar in ProcessingStatus
        ↓
WebSocket Event: "processing_update" (progress: 70%)
        ↓
WebSocket Event: "processing_complete"
  + expenses array with extracted data
        ↓
Frontend receives and stores in store.expenses
        ↓
DataCorrection.vue displays extracted items as "Unverified"
User can edit/verify each expense
        ↓
User clicks "Verify & Confirm"
        ↓
store.updateExpense() marks isVerified: true
        ↓
Expense moved from pendingExpenses to verifiedExpenses
        ↓
FinancialDashboard reflects updated totals
```

### User Correction Workflow

```
❌ AI extracted: $45.99 for "Starbucks" (Wrong amount)
        ↓
DataCorrection.vue shows full correction form:
├─ Date field (editable)
├─ Amount: 45.99 (editable) → User changes to 12.99
├─ Vendor: Starbucks (editable)
├─ Category dropdown (AI chose "Food & Dining", correct!)
├─ Description (optional)
└─ Original AI extract (read-only reference)
        ↓
User clicks "Verify & Confirm"
        ↓
store.updateExpense(expenseId, { amount: 12.99, isVerified: true })
        ↓
PATCH /api/expenses/{id} with new data
        ↓
Backend validates user authorization (Policy)
        ↓
Updates database
        ↓
Frontend removes from pendingExpenses
Dashboard totals recalculate automatically
        ↓
✅ Expense now verified and corrected
```

### Financial Insights Query Flow

```
User ask: "What's my top spending category in Food?"
        ↓
FinancialAssistant.vue sends message
        ↓
generateResponse() checks store data:
  - store.categoryBreakdown (computed)
  - store.totalSpending
  - store.verifiedExpenses
        ↓
Filter to Food & Dining category
        ↓
Calculate total: $245.67
        ↓
Generate human-readable response:
"Your top Food & Dining expense is $245.67.
Try setting weekly budget limits to save."
        ↓
Display in chat with timestamp
```

## 🔐 Security Architecture

### Authentication Layer

```
Request → Frontend adds Bearer token
        → Authorization: Bearer {JWT/token}
        → API middleware validates token
        → Routes require auth:sanctum
        → User authenticated = ✅
```

### Authorization Layer (Policies)

```
User A requests GET /api/expenses/123
        ↓
Backend loads Expense 123
        ↓
ExpensePolicy::view($user, $expense)
        ↓
Check: Does $user->id === $expense->user_id?
        ↓
  YES → Return data (200)
  NO → Return 403 Forbidden
```

### File Storage Security

```
❌ Bad: /public/receipts/receipt.jpg (publicly exposed!)

✅ Good: /storage/app/receipts/user-123/receipt.jpg
         File not in web root
         Access requires authentication
         Download returns file content-type
         No direct URL exposure
```

### Data Privacy

```
Database: Encrypted at rest (if configured)
Transit: HTTPS/TLS
WebSocket: WSS (secure WebSocket)
Frontend: No sensitive data in localStorage
Auth: httpOnly cookies or secure token storage
```

## 📊 Component Dependencies

```
LandingView (Main)
├── Navigation
│   └── useExpenseStore
├── ReceiptUpload
│   └── useExpenseStore.uploadReceipt()
├── ProcessingStatus
│   └── useExpenseStore (processes through WebSocket)
├── DataCorrection
│   └── useExpenseStore.updateExpense()
├── FinancialDashboard
│   └── useExpenseStore (computed properties)
└── FinancialAssistant
    └── useExpenseStore (for context)
```

## 📦 Data Models

### Frontend Store (Pinia)

```typescript
Expense {
  id: string
  date: string (YYYY-MM-DD)
  amount: number
  category: string
  vendor: string
  description: string
  receiptId: string
  isVerified: boolean
  originalData: Record<string, any> // Raw AI response
}

ProcessingJob {
  id: string (jobId)
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number (0-100)
  fileName: string
  receiptId: string
  errorMessage?: string
  createdAt: Date
}

FinancialData {
  totalSpending: number
  categoryBreakdown: Record<category, amount>
  expenses: Expense[]
  monthlySpending: Record<YYYY-MM, amount>
}
```

### Backend Database

```sql
CREATE TABLE receipts (
  id UUID PRIMARY KEY,
  user_id UUID,
  file_path VARCHAR,
  file_name VARCHAR,
  status ENUM('pending', 'processing', 'completed', 'failed'),
  error_message TEXT NULL,
  created_at TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
)

CREATE TABLE expenses (
  id UUID PRIMARY KEY,
  user_id UUID,
  receipt_id UUID NULL,
  date DATE,
  amount DECIMAL(10, 2),
  category VARCHAR,
  vendor VARCHAR,
  description TEXT,
  is_verified BOOLEAN,
  original_data JSON, // Store raw AI extract
  created_at TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(receipt_id) REFERENCES receipts(id)
)
```

## 🔄 Real-Time Updates (WebSocket Flow)

```
┌─ Frontend ─────────────────────┐
│                                │
│ ReceiptUpload.vue events         │
│ uploadReceipt() → POST /upload   │
│                                │
│ ← WebSocket subscription ←─────┼─ Backend ────────────────┐
│   user.{userId} channel      │                            │
│                                │ ProcessReceipt Job        │
│ Listen for:                     │ notify progress()         │
│ - processing_update             │ ├─ "processing_update"   │
│ - processing_complete           │ │   progress: 45%        │
│ - processing_error              │ │                        │
│                                │ ├─ "processing_update"   │
│ Update store on event:          │ │   progress: 80%        │
│ - job.progress = 45 → UI        │ │                        │
│ - job.progress = 80 → UI        │ ├─ "processing_complete" │
│ - store.expenses += [...] → UI  │ │   expenses: [...]      │
│                                │ └─ Broadcast             │
│ ProcessingStatus & Dashboard    │                         │
│ reactively update               │                         │
└────────────────────────────────┘                          │
                                  └──────────────────────────┘
```

## 🎯 Solving the 3 Key Challenges

### Challenge 1: Messy Data Problem

```
SOLUTION STACK:
┌───────────────────────────────────────┐
│ Image Preprocessing (Intervention)    │
│ - Upscale low-res                     │
│ - Enhance contrast                    │
│ - Sharpen details                     │
│ - Correct rotation                    │
│ - Remove noise                        │
└───────────────────────────────────────┘
              ↓
┌───────────────────────────────────────┐
│ OCR + AI (OpenAI Vision GPT-4)       │
│ - Force JSON structure in prompt      │
│ - Error handling for ambiguous data   │
│ - Confidence scoring                  │
└───────────────────────────────────────┘
              ↓
┌───────────────────────────────────────┐
│ Data Correction UI (Vue component)    │
│ - Real-time editing capability        │
│ - Show original for comparison        │
│ - Quick category dropdown             │
│ - One-click verification              │
└───────────────────────────────────────┘
```

### Challenge 2: Async Architecture

```
SOLUTION STACK:
┌───────────────────────────────────────┐
│ Immediate Response (202 Accepted)     │
│ - Return jobId instantly              │
│ - Don't wait for processing           │
│ - Server doesn't timeout              │
└───────────────────────────────────────┘
              ↓
┌───────────────────────────────────────┐
│ Background Job Queue (Laravel Queue)  │
│ - Process in separate workers         │
│ - Scalable to heavy load              │
│ - Retry logic for failures            │
└───────────────────────────────────────┘
              ↓
┌───────────────────────────────────────┐
│ Real-Time Updates (WebSocket/Reverb) │
│ - Progress updates to UI              │
│ - Live status without poll            │
│ - Instant completion notification     │
└───────────────────────────────────────┘
              ↓
┌───────────────────────────────────────┐
│ Frontend State Management (Pinia)     │
│ - Store job status                    │
│ - Append expenses when complete       │
│ - Reactive UI updates                 │
└───────────────────────────────────────┘
```

### Challenge 3: Security & Privacy

```
SOLUTION STACK:
┌───────────────────────────────────────┐
│ Authentication (JWT/Session)          │
│ - Verify user identity                │
│ - Sanctum middleware on all APIs      │
└───────────────────────────────────────┘
              ↓
┌───────────────────────────────────────┐
│ Authorization Policies (Laravel)      │
│ - User can only access own data       │
│ - Policy checks on every request      │
│ - Prevent data leakage                │
└───────────────────────────────────────┘
              ↓
┌───────────────────────────────────────┐
│ File Storage Security                 │
│ - Files in non-public storage path    │
│ - Access requires authentication      │
│ - No direct URL exposure              │
└───────────────────────────────────────┘
              ↓
┌───────────────────────────────────────┐
│ Data Privacy                          │
│ - Encrypted transmission (HTTPS/WSS)  │
│ - No sensitive data in localStorage   │
│ - User-scoped WebSocket channels      │
└───────────────────────────────────────┘
```

## 📈 Scalability Considerations

### For High Volume

1. **Add Queue Workers**: Run multiple `php artisan queue:work`
2. **Load Balancing**: Distribute Reverb across multiple servers
3. **Caching**: Cache financial insights computation
4. **Database Optimization**: Index user_id, date, category
5. **CDN**: Serve static frontend assets
6. **Horizontal Scaling**: Multiple Node.js instances

### Performance Optimization

1. **Lazy Loading**: Load components on demand
2. **Virtual Scrolling**: For large expense lists
3. **Image Compression**: Compress before upload
4. **Database Query Optimization**: Use eager loading
5. **Frontend Bundle Size**: Tree-shaking unused code

## 🧪 Testing Strategy

### Unit Tests

- Component logic (upload validation, data parsing)
- Store mutations and actions
- Utility functions

### Integration Tests

- API responses with real data format
- WebSocket event handling
- Authorization checks

### E2E Tests

- Complete user flow (upload → verification → dashboard)
- Real-time updates
- Error handling scenarios

## 📚 Key Implementation Files

| File                     | Purpose           | Key Logic                                 |
| ------------------------ | ----------------- | ----------------------------------------- |
| `expenseStore.ts`        | State management  | API calls, WebSocket, computed properties |
| `ReceiptUpload.vue`      | File upload UI    | Drag-drop, validation, upload trigger     |
| `ProcessingStatus.vue`   | Progress display  | WebSocket event handling, progress bar    |
| `DataCorrection.vue`     | Data verification | Inline editing, field validation, updates |
| `FinancialDashboard.vue` | Analytics         | Computed breakdowns, trending analysis    |
| `FinancialAssistant.vue` | Chat AI           | Context-aware responses, simulated AI     |
| `LandingView.vue`        | Main orchestrator | Tab management, component composition     |

## 🎬 Getting Started

1. **Read QUICKSTART.md** for development setup
2. **Review FRONTEND.md** for component documentation
3. **Check BACKEND_INTEGRATION.md** for API contract
4. **Run development server**: `npm run dev`
5. **Connect to backend**: Update API URLs in store
6. **Test components**: Use browser DevTools + Vue DevTools

## 📞 Support & Troubleshooting

See **QUICKSTART.md** troubleshooting section for common issues.

---

**Smart Expense Tracker © 2026** - Building trustworthy AI-powered finance!
