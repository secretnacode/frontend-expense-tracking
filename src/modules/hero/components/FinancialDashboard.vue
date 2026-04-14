<template>
  <div class="w-full max-w-6xl">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <!-- Dashboard Header -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Financial Dashboard</h2>
        <p class="text-gray-600">Your expense overview and trends</p>
      </div>

      <!-- Main Stats Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
        <!-- Total Spending Card -->
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-700 text-sm font-medium mb-1">Total Spending</p>
              <h3 class="text-3xl font-bold text-blue-900">${{ store.totalSpending.toFixed(2) }}</h3>
              <p class="text-xs text-blue-600 mt-2">All verified transactions</p>
            </div>
            <div class="text-4xl">💰</div>
          </div>
        </div>

        <!-- Verified Expenses Card -->
        <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-700 text-sm font-medium mb-1">Verified Expenses</p>
              <h3 class="text-3xl font-bold text-green-900">{{ store.verifiedExpenses.length }}</h3>
              <p class="text-xs text-green-600 mt-2">Ready for tax filing</p>
            </div>
            <div class="text-4xl">✅</div>
          </div>
        </div>

        <!-- Pending Review Card -->
        <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border border-yellow-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-yellow-700 text-sm font-medium mb-1">Pending Review</p>
              <h3 class="text-3xl font-bold text-yellow-900">{{ store.pendingExpenses.length }}</h3>
              <p class="text-xs text-yellow-600 mt-2">Needs verification</p>
            </div>
            <div class="text-4xl">⏳</div>
          </div>
        </div>
      </div>

      <!-- Category Breakdown and Timeline -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Category Breakdown -->
        <div>
          <h3 class="text-lg font-bold text-gray-900 mb-4">Spending by Category</h3>
          <div class="space-y-3">
            <div v-for="(amount, category) in sortedCategories" :key="category">
              <div class="flex items-center justify-between mb-1">
                <div class="flex items-center gap-2 flex-1">
                  <span class="text-lg">{{ getCategoryEmoji(category) }}</span>
                  <span class="text-sm font-medium text-gray-700">{{ category }}</span>
                </div>
                <span class="text-sm font-bold text-gray-900">${{ amount.toFixed(2) }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  :style="{ width: `${(amount / (Math.max(...Object.values(store.categoryBreakdown)) || 1)) * 100}%` }"
                  :class="[
                    'h-full transition-all duration-300',
                    getCategoryColor(category),
                  ]"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div>
          <h3 class="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h3>
          <div class="space-y-2 max-h-96 overflow-y-auto">
            <div
              v-for="expense in recentExpenses"
              :key="expense.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center gap-3 flex-1">
                <span class="text-lg">{{ getCategoryEmoji(expense.category) }}</span>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ expense.vendor }}</p>
                  <p class="text-xs text-gray-500">{{ formatDate(expense.date) }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span
                  :class="['text-xs px-2 py-1 rounded-full', getStatusBadge(expense.isVerified)]"
                >
                  {{ expense.isVerified ? '✓' : '⚠' }}
                </span>
                <span class="font-bold text-gray-900 whitespace-nowrap">${{ expense.amount.toFixed(2) }}</span>
              </div>
            </div>

            <div v-if="store.expenses.length === 0" class="text-center py-8">
              <p class="text-gray-500 text-sm">No transactions yet. Upload a receipt to get started!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Insights -->
      <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 class="text-sm font-bold text-blue-900 mb-3">💡 Quick Insights</h3>
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm text-blue-900">
          <div
            v-if="store.totalSpending > 0"
            class="flex items-start gap-2"
          >
            <span>•</span>
            <span>Your top spending category is <span class="font-bold">{{ topCategory }}</span></span>
          </div>
          <div class="flex items-start gap-2">
            <span>•</span>
            <span>You have <span class="font-bold">{{ store.pendingExpenses.length }} items</span> awaiting verification</span>
          </div>
          <div
            v-if="averagePetTransaction > 0"
            class="flex items-start gap-2"
          >
            <span>•</span>
            <span>Average transaction: <span class="font-bold">${{ averagePetTransaction.toFixed(2) }}</span></span>
          </div>
          <div class="flex items-start gap-2">
            <span>•</span>
            <span><span class="font-bold">{{ verificationRate }}%</span> of your expenses are verified</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useExpenseStore } from '../stores/expenseStore'

const store = useExpenseStore()

const sortedCategories = computed(() => {
  return Object.entries(store.categoryBreakdown)
    .sort((a, b) => b[1] - a[1])
})

const recentExpenses = computed(() => {
  return [...store.expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
})

const topCategory = computed(() => {
  const entries = Object.entries(store.categoryBreakdown)
  return entries.length > 0 ? entries[0][0] : 'N/A'
})

const averagePetTransaction = computed(() => {
  if (store.expenses.length === 0) return 0
  return store.totalSpending / store.expenses.length
})

const verificationRate = computed(() => {
  if (store.expenses.length === 0) return 0
  return Math.round((store.verifiedExpenses.length / store.expenses.length) * 100)
})

function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    'Food & Dining': '🍽️',
    Transportation: '🚗',
    Shopping: '🛍️',
    Entertainment: '🎬',
    Utilities: '💡',
    Healthcare: '🏥',
    'Office Supplies': '📎',
    Travel: '✈️',
    Subscriptions: '📱',
    Other: '📌',
  }
  return emojis[category] || '📌'
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Food & Dining': 'bg-red-500',
    Transportation: 'bg-blue-500',
    Shopping: 'bg-pink-500',
    Entertainment: 'bg-purple-500',
    Utilities: 'bg-yellow-500',
    Healthcare: 'bg-green-500',
    'Office Supplies': 'bg-indigo-500',
    Travel: 'bg-cyan-500',
    Subscriptions: 'bg-orange-500',
    Other: 'bg-gray-500',
  }
  return colors[category] || 'bg-gray-500'
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function getStatusBadge(isVerified: boolean): string {
  return isVerified
    ? 'bg-green-100 text-green-700'
    : 'bg-yellow-100 text-yellow-700'
}
</script>
