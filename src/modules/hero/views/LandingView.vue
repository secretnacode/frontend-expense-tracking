<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
    <!-- Navigation -->
    <Navigation :activeTab="activeTab" @tab-change="activeTab = $event" @logout="handleLogout" />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header with Intro -->
      <div v-if="activeTab === 'upload'" class="mb-8">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Smart Expense & Receipt Tracker
        </h2>
        <p class="text-lg text-gray-600">
          🎯 Upload receipts or bank CSVs. AI automatically categorizes, extracts data, and provides
          financial insights.
        </p>
      </div>

      <!-- Tab Content Container -->
      <div class="space-y-8">
        <!-- Upload Tab -->
        <div v-if="activeTab === 'upload'" class="space-y-8">
          <ReceiptUpload />
          <ProcessingStatus />
        </div>

        <!-- Verify Tab -->
        <div v-if="activeTab === 'process'" class="space-y-8">
          <DataCorrection />
          <div
            v-if="store.pendingExpenses.length === 0 && store.expenses.length > 0"
            class="text-center py-12"
          >
            <div class="text-6xl mb-4">🎉</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">All Done!</h3>
            <p class="text-gray-600">
              All your expenses have been verified. Great job keeping organized!
            </p>
          </div>
        </div>

        <!-- Dashboard Tab -->
        <div v-if="activeTab === 'dashboard'">
          <FinancialDashboard />
        </div>

        <!-- Assistant Tab -->
        <div v-if="activeTab === 'assistant'">
          <FinancialAssistant />
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="
          activeTab === 'process' &&
          store.pendingExpenses.length === 0 &&
          store.expenses.length === 0
        "
        class="text-center py-12"
      >
        <div class="text-6xl mb-4">📝</div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">No expenses yet</h3>
        <p class="text-gray-600 mb-6">Upload a receipt or CSV file to get started</p>
        <button
          @click="activeTab = 'upload'"
          class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
        >
          📤 Upload Receipt
        </button>
      </div>

      <div
        v-if="activeTab === 'dashboard' && store.expenses.length === 0"
        class="text-center py-12"
      >
        <div class="text-6xl mb-4">📊</div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">No data to display</h3>
        <p class="text-gray-600 mb-6">
          Start by uploading receipts to see your financial dashboard
        </p>
        <button
          @click="activeTab = 'upload'"
          class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
        >
          📤 Upload Receipt
        </button>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-200 bg-white mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Brand -->
          <div>
            <h4 class="font-bold text-gray-900 mb-2">💳 Smart Expense Tracker</h4>
            <p class="text-sm text-gray-600">
              AI-powered expense management for small business owners and freelancers.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-semibold text-gray-900 mb-3">Features</h4>
            <ul class="space-y-2 text-sm text-gray-600">
              <li><a href="#" class="hover:text-blue-600">Receipt OCR</a></li>
              <li><a href="#" class="hover:text-blue-600">CSV Import</a></li>
              <li><a href="#" class="hover:text-blue-600">Auto Categorization</a></li>
              <li><a href="#" class="hover:text-blue-600">Financial Assistant</a></li>
            </ul>
          </div>

          <!-- Security -->
          <div>
            <h4 class="font-semibold text-gray-900 mb-3">Security</h4>
            <ul class="space-y-2 text-sm text-gray-600">
              <li><a href="#" class="hover:text-blue-600">Data Protection</a></li>
              <li><a href="#" class="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-blue-600">Tax Compliance</a></li>
              <li><a href="#" class="hover:text-blue-600">GDPR Compliant</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h4 class="font-semibold text-gray-900 mb-3">Support</h4>
            <ul class="space-y-2 text-sm text-gray-600">
              <li><a href="#" class="hover:text-blue-600">Help Center</a></li>
              <li><a href="#" class="hover:text-blue-600">Documentation</a></li>
              <li><a href="#" class="hover:text-blue-600">Contact Us</a></li>
              <li><a href="#" class="hover:text-blue-600">Status</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-200 mt-8 pt-8">
          <p class="text-center text-sm text-gray-600">
            © 2026 Smart Expense Tracker. All rights reserved. | Built with Vue 3 + AI
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useExpenseStore } from '../stores/expenseStore'
import Navigation from '../components/Navigation.vue'
import ReceiptUpload from '../components/ReceiptUpload.vue'
import ProcessingStatus from '../components/ProcessingStatus.vue'
import DataCorrection from '../components/DataCorrection.vue'
import FinancialDashboard from '../components/FinancialDashboard.vue'
import FinancialAssistant from '../components/FinancialAssistant.vue'

const store = useExpenseStore()
const activeTab = ref<'upload' | 'process' | 'dashboard' | 'assistant'>('upload')

onMounted(() => {
  // Initialize user session
  const mockUser = {
    id: 'user-123',
    email: 'user@example.com',
  }
  store.setCurrentUser(mockUser)

  // Initialize WebSocket connection for real-time updates
  store.initializeWebSocket(mockUser.id)

  // Load initial expenses
  store.fetchExpenses()
})

function handleLogout() {
  // Here you would implement actual logout logic
  // For now, just reset the store
  store.setCurrentUser(null as unknown as { id: string; email: string })
  activeTab.value = 'upload'
}
</script>

<style scoped>
/* Smooth gradient backgrounds */
:deep {
  * {
    @apply transition-colors duration-200;
  }
}
</style>
