# Quick Start Guide

## Prerequisites

- Node.js 20.19.0 or higher (22.12.0+)
- npm or yarn
- Git

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Create environment variables file
cp .env.example .env  # If it exists, otherwise create .env

# 3. Configure API endpoints in your environment
# Open .env and set:
# VITE_API_URL=http://localhost:8000  # Your Laravel backend URL
```

## Development

```bash
# Start dev server (runs on http://localhost:5173)
npm run dev

# Type checking
npm run type-check

# Linting with auto-fix
npm run lint

# Code formatting
npm run format
```

## Architecture Overview

```
🎯 Smart Expense Tracker
│
├── 📤 Upload & Processing
│   └── Receipt photos & CSV files → Background jobs
│
├── ✅ Data Verification
│   └── AI extraction correction UI
│
├── 📊 Financial Dashboard
│   └── Spending analytics & insights
│
└── 💬 Financial Assistant
    └── AI-powered chat interface
```

## Key Files to Know

- **src/modules/hero/views/LandingView.vue** - Main app orchestrator
- **src/modules/hero/stores/expenseStore.ts** - State & API logic
- **src/modules/hero/components/** - Reusable UI components
- **FRONTEND.md** - Comprehensive documentation
- **BACKEND_INTEGRATION.md** - API contract & Laravel guide

## Connecting to Backend

Update your API calls in `src/modules/hero/stores/expenseStore.ts`:

```typescript
async uploadReceipt(file: File): Promise<ProcessingJob> {
  const formData = new FormData()
  formData.append('file', file)

  try {
    // Replace with your actual backend URL
    const response = await fetch('YOUR_BACKEND_URL/api/receipts/upload', {
      method: 'POST',
      body: formData,
      headers: {
        // Add auth header if needed
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    // ... rest of code
  }
}
```

## Setting Up WebSockets

In `expenseStore.ts`, update WebSocket URL:

```typescript
function initializeWebSocket(userId: string) {
  const wsUrl = 'ws://YOUR_BACKEND_HOST:8080/ws/' + userId
  webSocketConnection.value = new WebSocket(wsUrl)
  // ...
}
```

## Testing Components

You can test components in isolation in `LandingView.vue` by changing `activeTab`:

```typescript
const activeTab = ref<'upload' | 'process' | 'dashboard' | 'assistant'>('dashboard')
```

## Building for Production

```bash
# Create optimized build
npm run build

# Output will be in dist/

# Preview production build locally
npm run preview
```

## Troubleshooting

**DevServer won't start?**

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**TypeScript errors?**

```bash
npm run type-check
```

**Styles not loading?**

- Ensure TailwindCSS is properly imported in `src/assets/main.css`
- Check: `@import 'tailwindcss';`

**WebSocket connection fails?**

- Check backend is running on port 8080
- Verify firewall allows WS connections
- Check browser console for errors

## Project Structure

```
src/
├── main.ts                          # App entry point
├── assets/
│   ├── base.css                    # Base styles
│   └── main.css                    # TailwindCSS imports
├── router/
│   └── index.ts                    # Vue Router config
├── modules/hero/
│   ├── components/
│   │   ├── Navigation.vue          # Top nav + user menu
│   │   ├── ReceiptUpload.vue       # File upload UI
│   │   ├── ProcessingStatus.vue    # Job progress tracker
│   │   ├── DataCorrection.vue      # Data verification editor
│   │   ├── FinancialDashboard.vue  # Analytics dashboard
│   │   └── FinancialAssistant.vue  # Chat interface
│   ├── stores/
│   │   └── expenseStore.ts         # Pinia state management
│   └── views/
│       └── LandingView.vue         # Main orchestrator page
└── env.d.ts                         # Type definitions

public/                              # Static assets
```

## Common Tasks

### Add a New Expense Category

1. Edit `DataCorrection.vue`:

```typescript
const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'YOUR_NEW_CATEGORY', // Add here
]
```

2. Add emoji to `getCategoryEmoji()`:

```typescript
'YOUR_NEW_CATEGORY': '🎯',
```

3. Add color to `getCategoryColor()`:

```typescript
'YOUR_NEW_CATEGORY': 'bg-purple-500',
```

### Customize Dashboard Insights

Edit `FinancialDashboard.vue` quick insights section or add computed properties.

### Extend Financial Assistant

Edit `FinancialAssistant.vue` `generateResponse()` to add custom logic or API calls.

## Performance Tips

- Use `lazy.defineAsyncComponent()` for heavy components
- Implement virtual scrolling for large lists (use a library like `vue-virtual-scroller`)
- Compress images before upload
- Use browser caching for expense data

## Security Best Practices

- Always send requests with authentication headers
- Don't store sensitive data in localStorage (use httpOnly cookies)
- Validate file types both frontend and backend
- Sanitize user input before displaying

## Next Steps

1. ✅ Review **FRONTEND.md** for complete documentation
2. ✅ Review **BACKEND_INTEGRATION.md** for API integration
3. ✅ Connect to your Laravel backend
4. ✅ Set up WebSocket server (Laravel Reverb)
5. ✅ Configure authentication
6. ✅ Customize categories and styling
7. ✅ Deploy!

## Support

For issues:

1. Check browser DevTools (F12)
2. Review network tab for API calls
3. Check WebSocket tab for Real-time connections
4. Review Pinia store state (Vue DevTools)
5. Check component source code

Good luck! 🚀
