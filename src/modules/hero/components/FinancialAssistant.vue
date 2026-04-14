<template>
  <div class="w-full max-w-2xl">
    <div class="bg-white rounded-lg shadow-lg p-6 flex flex-col h-96">
      <!-- Header -->
      <div class="mb-4">
        <h3 class="text-lg font-bold text-gray-900">💬 Financial Health Assistant</h3>
        <p class="text-sm text-gray-600">Ask me about your spending patterns and financial health</p>
      </div>

      <!-- Messages Container -->
      <div class="flex-1 overflow-y-auto mb-4 space-y-3 bg-gray-50 rounded-lg p-4">
        <!-- Initial Welcome Message -->
        <div v-if="messages.length === 0" class="space-y-2">
          <div class="bg-blue-100 rounded-lg p-3 max-w-xs">
            <p class="text-sm text-blue-900">
              👋 Hi! I'm your financial health assistant. I can help you understand your spending patterns, suggest ways to save, and provide insights about your finances.
            </p>
          </div>
          <div class="bg-blue-100 rounded-lg p-3 max-w-xs">
            <p class="text-sm text-blue-900">
              Try asking me: "What's my biggest expense category?" or "How can I reduce my spending?"
            </p>
          </div>
        </div>

        <!-- Chat Messages -->
        <div v-for="(msg, idx) in messages" :key="idx" :class="['flex', msg.sender === 'user' ? 'justify-end' : 'justify-start']">
          <div
            :class="[
              'rounded-lg p-3 max-w-xs break-words',
              msg.sender === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900',
            ]"
          >
            <p class="text-sm">{{ msg.text }}</p>
            <p :class="['text-xs mt-1', msg.sender === 'user' ? 'text-blue-100' : 'text-gray-600']">
              {{ formatTime(msg.timestamp) }}
            </p>
          </div>
        </div>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex justify-start">
          <div class="bg-gray-200 rounded-lg p-3">
            <div class="flex gap-1">
              <span
                v-for="i in 3"
                :key="i"
                class="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                :style="{ animationDelay: `${i * 0.15}s` }"
              ></span>
            </div>
          </div>
        </div>

        <!-- Ref for scrolling -->
        <div ref="messagesEnd"></div>
      </div>

      <!-- Quick Actions -->
      <div v-if="messages.length === 0" class="mb-4 space-y-2">
        <p class="text-xs text-gray-600 font-medium">Quick questions:</p>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="question in quickQuestions"
            :key="question"
            @click="sendMessage(question)"
            class="text-xs p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            {{ question }}
          </button>
        </div>
      </div>

      <!-- Input Area -->
      <div class="flex gap-2">
        <input
          v-model="inputMessage"
          @keyup.enter="sendMessage()"
          type="text"
          placeholder="Ask about your expenses..."
          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          :disabled="isLoading"
        />
        <button
          @click="sendMessage()"
          :disabled="!inputMessage.trim() || isLoading"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-all',
            inputMessage.trim() && !isLoading
              ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed',
          ]"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useExpenseStore } from '../stores/expenseStore'

const store = useExpenseStore()

interface Message {
  sender: 'user' | 'assistant'
  text: string
  timestamp: Date
}

const messages = ref<Message[]>([])
const inputMessage = ref<string>('')
const isLoading = ref(false)
const messagesEnd = ref<HTMLElement>()

const quickQuestions = [
  'What\'s my top category?',
  'Total spending?',
  'Save money tips',
  'Monthly average?',
]

async function sendMessage(question?: string) {
  const message = question || inputMessage.value.trim()
  if (!message) return

  // Add user message
  messages.value.push({
    sender: 'user',
    text: message,
    timestamp: new Date(),
  })

  inputMessage.value = ''
  isLoading.value = true

  await nextTick(() => {
    messagesEnd.value?.scrollIntoView({ behavior: 'smooth' })
  })

  // Simulate AI response with financial insights
  try {
    const response = await generateResponse(message)
    messages.value.push({
      sender: 'assistant',
      text: response,
      timestamp: new Date(),
    })
  } catch (error) {
    messages.value.push({
      sender: 'assistant',
      text: 'Sorry, I encountered an error processing your question. Please try again.',
      timestamp: new Date(),
    })
  }

  isLoading.value = false

  await nextTick(() => {
    messagesEnd.value?.scrollIntoView({ behavior: 'smooth' })
  })
}

async function generateResponse(question: string): Promise<string> {
  // This would call your backend API
  // For now, return contextual responses based on store data
  const total = store.totalSpending.toFixed(2)
  const verified = store.verifiedExpenses.length
  const topCat = getTopCategory()

  const lowerQ = question.toLowerCase()

  if (lowerQ.includes('top') || lowerQ.includes('category')) {
    const amount = store.categoryBreakdown[topCat]?.toFixed(2)
    return `Your top spending category is "${topCat}" with $${amount} spent. Consider reviewing this category to find savings opportunities.`
  }

  if (lowerQ.includes('total') || lowerQ.includes('spending')) {
    return `Your total spending across verified transactions is $${total}. You have ${verified} verified expenses in your system.`
  }

  if (lowerQ.includes('save') || lowerQ.includes('reduce')) {
    return `Here are some ways to reduce spending:\n1. Track discretionary expenses more carefully\n2. Look for subscription services you're not actively using\n3. Set spending limits by category\n4. Review your dining and entertainment expenses\n5. Consider batch shopping to save on transportation`
  }

  if (lowerQ.includes('average') || lowerQ.includes('monthly')) {
    const avg = (store.totalSpending / Math.max(store.expenses.length, 1)).toFixed(2)
    return `Your average transaction is $${avg}. Based on your current data, you're maintaining a relatively consistent spending pattern.`
  }

  if (lowerQ.includes('health') || lowerQ.includes('financial')) {
    return `Based on your verified expenses, your financial tracking is at ${Math.round((verified / Math.max(store.expenses.length, 1)) * 100)}% completion. Keep organizing your receipts for better tax preparation!`
  }

  // Default response
  return `I can help you analyze your finances! Try asking about your spending by category, total spending, money-saving tips, or your average transaction amount. What would you like to know?`
}

function getTopCategory(): string {
  const entries = Object.entries(store.categoryBreakdown)
  if (entries.length === 0) return 'expenses'
  return entries.sort((a, b) => b[1] - a[1])[0][0]
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
</style>
