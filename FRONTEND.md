# Smart Expense Tracker - Frontend Documentation

## 🎯 Overview

This is a comprehensive Vue 3 + TypeScript frontend for the AI-Powered Smart Expense Tracker system. It handles:

- Receipt uploads and image processing
- CSV/Excel bank statement imports
- Real-time processing status with WebSocket support
- AI-powered data correction and verification UI
- Financial dashboard with spending analytics
- AI Financial Health Assistant Chat

## 📁 Project Structure

```
src/modules/hero/
├── components/          # Reusable Vue components
│   ├── Navigation.vue           # Top navigation with user menu
│   ├── ReceiptUpload.vue        # File upload interface
│   ├── ProcessingStatus.vue     # Real-time job progress
│   ├── DataCorrection.vue       # Data verification & editing
│   ├── FinancialDashboard.vue   # Analytics & insights
│   └── FinancialAssistant.vue   # AI chat assistant
├── stores/              # Pinia state management
│   └── expenseStore.ts  # Centralized expense logic
└── views/
    └── LandingView.vue  # Main page orchestrator
```

## 🚀 Key Features

### 1. **Receipt Upload** (`ReceiptUpload.vue`)

- Drag-and-drop image upload
- CSV/Excel file import
- Real-time file preview
- Support for PNG, JPG, GIF (up to 10MB)
- CSV/XLS/XLSX (up to 25MB)

### 2. **Real-Time Processing** (`ProcessingStatus.vue`)

- WebSocket-driven live progress updates
- Multi-step processing visualization
- Error handling and retry logic
- Status badges (Pending, Processing, Completed, Failed)

### 3. **Data Correction Interface** (`DataCorrection.vue`)

- Expandable UI for each expense item
- Inline editing of extracted data:
  - Date picker
  - Amount verification
  - Vendor correction
  - Category selection (10 predefined categories)
  - Custom description notes
- Shows original AI extract for reference
- Verify/Confirm and Delete actions
- Verification rate tracking

### 4. **Financial Dashboard** (`FinancialDashboard.vue`)

- **Summary Cards**:
  - Total spending (verified transactions)
  - Number of verified expenses
  - Pending review count
- **Category Breakdown**: Visual spending by category
- **Recent Transactions**: Last 5 transactions with status
- **Quick Insights**: AI-generated financial summarization

### 5. **Financial Assistant** (`FinancialAssistant.vue`)

- Chat interface with AI responses
- Context-aware answers based on expense data
- Quick question suggestions
- Real-time typing indicators
- Message timestamps

## 🔧 State Management (Pinia)

### Store: `useExpenseStore`

**State:**

```typescript
expenses: ExtractedExpense[]          // All uploaded expenses
processingJobs: ProcessingJob[]        // Upload/processing jobs tracking
financialData: FinancialData          // Aggregated financial metrics
webSocketConnection: WebSocket | null // Live connection
isConnected: boolean                   // Connection status
currentUser: { id, email } | null     // Current authenticated user
```

**Computed Properties:**

- `totalSpending`: Sum of all verified expenses
- `categoryBreakdown`: Record<category, amount>
- `verifiedExpenses`: List of confirmed expenses
- `pendingExpenses`: List of unverified expenses
- `activeJobs`: Currently processing jobs

**Methods:**

```typescript
initializeWebSocket(userId) // Connect for real-time updates
uploadReceipt(file) // Send receipt image to backend
uploadCSV(file) // Send bank CSV to backend
updateExpense(id, updates) // Modify expense data
deleteExpense(id) // Remove expense
fetchExpenses(filters) // Load expenses from backend
setCurrentUser(user) // Set authenticated user
```

## 🔌 Backend API Integration

### Required Endpoints

#### 1. Receipt Upload

```
POST /api/receipts/upload
Content-Type: multipart/form-data

Request:
- file: File (image/jpeg, image/png, image/gif)

Response:
{
  "jobId": "job-uuid",
  "receiptId": "receipt-uuid",
  "status": "pending"
}
```

#### 2. CSV Upload

```
POST /api/csv/upload
Content-Type: multipart/form-data

Request:
- file: File (text/csv, application/vnd.ms-excel, etc.)

Response:
{
  "jobId": "job-uuid",
  "status": "pending"
}
```

#### 3. Fetch Expenses

```
GET /api/expenses?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&category=Food%20&%20Dining

Response:
{
  "expenses": [
    {
      "id": "expense-uuid",
      "date": "2026-01-15",
      "amount": 45.99,
      "category": "Food & Dining",
      "vendor": "Restaurant Name",
      "description": "Lunch meeting",
      "receiptId": "receipt-uuid",
      "isVerified": false,
      "originalData": { ... }
    }
  ],
  "financialData": {
    "totalSpending": 1234.56,
    "categoryBreakdown": { "Food & Dining": 200, ... },
    "expenses": [...],
    "monthlySpending": { "2026-01": 1234.56, ... }
  }
}
```

### WebSocket Events

#### Connection

```
ws://localhost:8080/ws/{userId}
```

#### Events from Backend → Frontend

**1. Processing Update**

```json
{
  "type": "processing_update",
  "jobId": "job-uuid",
  "progress": 45
}
```

**2. Processing Complete**

```json
{
  "type": "processing_complete",
  "jobId": "job-uuid",
  "expenses": [
    {
      "id": "expense-uuid",
      "date": "2026-01-15",
      "amount": 45.99,
      "category": "Food & Dining",
      "vendor": "Restaurant Name",
      "description": "...",
      "receiptId": "receipt-uuid",
      "isVerified": false,
      "originalData": { ... }
    }
  ]
}
```

**3. Processing Error**

```json
{
  "type": "processing_error",
  "jobId": "job-uuid",
  "error": "Failed to extract data from image"
}
```

## 🔐 Security & Authorization

The frontend assumes:

1. **User Authentication**: Implement JWT tokens or Laravel sessions
2. **Policy Enforcement**: Backend validates user owns expense data
3. **File Storage**: Images stored securely (not public URLs)
4. **Data Privacy**: Sensitive financial data encrypted in transit

### Example: Add Auth Header to Requests

```typescript
async uploadReceipt(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('/api/receipts/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: formData
  })
  // ...
}
```

## 🎨 Styling

Uses **Tailwind CSS v4** with a custom color scheme:

- **Primary**: Blue (600, 700)
- **Success**: Green
- **Warning**: Yellow
- **Danger**: Red

### Common Classes Used

- `bg-gradient-to-br`: Gradient backgrounds
- `rounded-lg`: Border radius
- `shadow-lg`: Card shadows
- `transition-all`: Smooth animations
- `flex gap-*`: Consistent spacing

## 📱 Responsive Design

- **Mobile First**: Optimized for small screens
- **Tablet**: 2-column layouts
- **Desktop**: Full 4-column dashboards
- Hidden labels on mobile, show only icons
- Hamburger-style tab navigation on mobile

## 🚀 Development Workflow

### 1. Start Development Server

```bash
npm run dev
```

### 2. Type Checking

```bash
npm run type-check
```

### 3. Linting & Formatting

```bash
npm run lint
npm run format
```

### 4. Production Build

```bash
npm run build
```

## 🧪 Component Communication

```
LandingView.vue (Main Orchestrator)
├── Navigation.vue (Tab switching + logout)
├── ReceiptUpload.vue → useExpenseStore.uploadReceipt()
├── ProcessingStatus.vue ← WebSocket events
├── DataCorrection.vue → useExpenseStore.updateExpense()
├── FinancialDashboard.vue ← store.expenses (computed)
└── FinancialAssistant.vue (Standalone chat)
```

## 🔄 Data Flow Example: Receipt Upload

```mermaid
User selects receipt image
         ↓
ReceiptUpload.vue validates file
         ↓
store.uploadReceipt(file) → POST /api/receipts/upload
         ↓
Backend returns jobId
         ↓
ProcessingStatus.vue displays "Pending"
         ↓
WebSocket "processing_update" events → progress bar updates
         ↓
WebSocket "processing_complete" event
         ↓
store.expenses updated with ExtractedExpense[]
         ↓
DataCorrection.vue shows new unverified expenses
         ↓
User edits & verifies → store.updateExpense()
         ↓
Expense marked isVerified: true
         ↓
Financial Dashboard reflects updated totals
```

## 🎯 Handling the 3 Key Challenges

### 1. Messy Data & OCR Correction

- **Problem**: AI may extract incorrect data from blurry/crumpled receipts
- **Solution**:
  - Show original AI extract in read-only section
  - Allow inline editing of all fields
  - Display before/after comparison

### 2. Asynchronous Processing & WebSockets

- **Problem**: Receipt processing takes time, can't wait for response
- **Solution**:
  - Immediate job creation returns jobId
  - Real-time progress via WebSocket
  - Progress bar visual feedback
  - Append expenses automatically when complete

### 3. Data Privacy & Security

- **Problem**: Financial data must be protected
- **Solution**:
  - All API calls use authentication headers
  - Backend validates user ownership
  - Images stored securely (not in frontend)
  - User-scoped WebSocket connections
  - Clear segregation of user data in store

## 📚 Extending the System

### Adding New Categories

Edit `DataCorrection.vue` and `FinancialAssistant.vue`:

```typescript
const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  '...', // Add your category here
]
```

### Customizing Financial Insights

Modify `FinancialAssistant.vue` `generateResponse()` method to add custom logic.

### Integrating Real AI Backend

Replace mock responses in `FinancialAssistant.vue` with actual API calls:

```typescript
async function generateResponse(question: string): Promise<string> {
  const response = await fetch('/api/assistant/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: question,
      context: {
        totalSpending: store.totalSpending,
        expenses: store.verifiedExpenses,
      },
    }),
  })
  return (await response.json()).response
}
```

## 🐛 Debugging

### Enable Console Logging

Open browser DevTools (F12) and check:

1. WebSocket connections: Network → WS tab
2. API calls: Network tab
3. Pinia store: Vue DevTools → Pinia

### Common Issues

**WebSocket not connecting?**

- Check backend is running on localhost:8080
- Verify firewall allows WS connections
- Check browser console for errors

**Expenses not showing?**

- Verify `/api/expenses` endpoint returns correct format
- Check store.fetchExpenses() is called on mount
- Inspect actual API response in DevTools

**Upload fails silently?**

- Check CORS headers in backend
- Verify file size limits
- Check browser console for fetch errors

## 📞 Support

For issues with:

- **Frontend Logic**: Check component's `<script>` section
- **Styling**: Look for TailwindCSS classes
- **State Management**: Review `expenseStore.ts`
- **Backend Integration**: Verify API endpoints match documentation

## 📄 License

Part of Smart Expense Tracking System
