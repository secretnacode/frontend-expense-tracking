<template>
  <div v-if="store.pendingExpenses.length > 0" class="w-full max-w-4xl">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-bold text-gray-900">
          Verify & Correct Data ({{ store.pendingExpenses.length }} items)
        </h3>
        <button
          @click="collapseAll = !collapseAll"
          class="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {{ collapseAll ? 'Expand All' : 'Collapse All' }}
        </button>
      </div>

      <div class="space-y-3">
        <div
          v-for="(expense, idx) in store.pendingExpenses"
          :key="expense.id"
          class="border border-gray-200 rounded-lg overflow-hidden"
        >
          <!-- Header -->
          <button
            @click="toggleExpense(idx)"
            class="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center gap-3 flex-1 text-left">
              <span :class="['text-lg', getCategoryEmoji(expense.category)]">
                {{ getCategoryEmoji(expense.category) }}
              </span>
              <div class="flex-1">
                <p class="font-medium text-gray-900">{{ expense.vendor }}</p>
                <p class="text-sm text-gray-600">{{ formatDate(expense.date) }}</p>
              </div>
              <div class="text-right">
                <p class="font-bold text-gray-900">${{ expense.amount.toFixed(2) }}</p>
                <p class="text-sm text-gray-500">{{ expense.category }}</p>
              </div>
            </div>
            <span :class="['ml-4 transition-transform', expandedItems.includes(idx) && 'rotate-180']">
              ▼
            </span>
          </button>

          <!-- Content -->
          <div
            v-if="expandedItems.includes(idx)"
            class="border-t border-gray-200 p-4 bg-white space-y-4"
          >
            <!-- Editable Fields Grid -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <!-- Date -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  :value="expense.date"
                  @input="updateField(expense.id, 'date', ($event.target as HTMLInputElement).value)"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <!-- Amount -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  :value="expense.amount"
                  @input="updateField(expense.id, 'amount', parseFloat(($event.target as HTMLInputElement).value))"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <!-- Vendor -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
                <input
                  type="text"
                  :value="expense.vendor"
                  @input="updateField(expense.id, 'vendor', ($event.target as HTMLInputElement).value)"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <!-- Category -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  :value="expense.category"
                  @input="updateField(expense.id, 'category', ($event.target as HTMLSelectElement).value)"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option v-for="cat in categories" :key="cat" :value="cat">
                    {{ cat }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                :value="expense.description"
                @input="updateField(expense.id, 'description', ($event.target as HTMLTextAreaElement).value)"
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Add notes about this transaction..."
              ></textarea>
            </div>

            <!-- Original Extract (Read-only for Reference) -->
            <div v-if="expense.originalData" class="bg-gray-50 rounded-lg p-3">
              <p class="text-xs font-medium text-gray-600 mb-2">Original AI Extract:</p>
              <pre class="text-xs text-gray-700 overflow-auto max-h-32">{{
                JSON.stringify(expense.originalData, null, 2)
              }}</pre>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-2 pt-2 border-t border-gray-200">
              <button
                @click="verifyExpense(expense.id)"
                class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
              >
                ✓ Verify & Confirm
              </button>
              <button
                @click="deleteExpense(expense.id)"
                class="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-medium transition-colors"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useExpenseStore } from '../stores/expenseStore'

const store = useExpenseStore()

const expandedItems = ref<number[]>([])
const collapseAll = ref(false)

const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Office Supplies',
  'Travel',
  'Subscriptions',
  'Other',
]

function toggleExpense(idx: number) {
  const pos = expandedItems.value.indexOf(idx)
  if (pos > -1) {
    expandedItems.value.splice(pos, 1)
  } else {
    expandedItems.value.push(idx)
  }
}

function updateField(
  expenseId: string,
  field: string,
  value: string | number | boolean
) {
  const updates: Record<string, string | number | boolean> = {}
  updates[field] = value
  store.updateExpense(expenseId, updates as Record<string, unknown> as Parameters<typeof store.updateExpense>[1])
}

function verifyExpense(expenseId: string) {
  const expense = store.expenses.find((e) => e.id === expenseId)
  if (expense) {
    store.updateExpense(expenseId, { isVerified: true })
    expandedItems.value = expandedItems.value.filter(
      (_, i) => store.pendingExpenses[i]?.id !== expenseId
    )
  }
}

function deleteExpense(expenseId: string) {
  if (confirm('Are you sure you want to delete this expense?')) {
    store.deleteExpense(expenseId)
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

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
</script>
