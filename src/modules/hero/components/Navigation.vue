<template>
  <nav class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Brand -->
        <div class="flex items-center gap-3">
          <div class="text-3xl">💳</div>
          <div>
            <h1 class="text-xl font-bold text-gray-900">Smart Expense Tracker</h1>
            <p class="text-xs text-gray-500">AI-Powered Receipt & Expense Management</p>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="hidden md:flex items-center gap-1">
          <button
            v-for="tab in navTabs"
            :key="tab.id"
            @click="emit('tab-change', tab.id)"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              activeTab === tab.id
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
            ]"
          >
            <span class="mr-2">{{ tab.icon }}</span>
            {{ tab.label }}
          </button>
        </div>

        <!-- User Section -->
        <div class="flex items-center gap-4">
          <!-- Sync Status -->
          <div v-if="store.isConnected" class="flex items-center gap-1 text-xs text-green-600">
            <span class="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
            <span>Connected</span>
          </div>

          <!-- User Menu -->
          <div class="relative">
            <button
              @click="isUserMenuOpen = !isUserMenuOpen"
              class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div
                class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold"
              >
                {{ userInitial }}
              </div>
              <span class="text-sm font-medium text-gray-700 hidden sm:inline">
                {{ userEmail?.split('@')[0] || 'User' }}
              </span>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isUserMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1"
            >
              <div class="px-4 py-2 border-b border-gray-200">
                <p class="text-sm text-gray-900 font-medium">{{ userEmail }}</p>
                <p class="text-xs text-gray-500">Free Account</p>
              </div>
              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Tab Navigation -->
      <div class="md:hidden flex gap-1 pb-2 overflow-x-auto">
        <button
          v-for="tab in navTabs"
          :key="tab.id"
          @click="emit('tab-change', tab.id)"
          :class="[
            'px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all',
            activeTab === tab.id
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
          ]"
        >
          {{ tab.icon }} {{ tab.label }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useExpenseStore } from '../stores/expenseStore'

const store = useExpenseStore()

interface NavTab {
  id: string
  label: string
  icon: string
}

defineProps<{
  activeTab: string
}>()

const emit = defineEmits<{
  'tab-change': [tabId: string]
  logout: []
}>()

const navTabs: NavTab[] = [
  { id: 'upload', label: 'Upload', icon: '📤' },
  { id: 'process', label: 'Verify', icon: '✅' },
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'assistant', label: 'Assistant', icon: '💬' },
]

const isUserMenuOpen = ref(false)

const userEmail = computed(() => {
  return store.currentUser?.email || 'user@example.com'
})

const userInitial = computed(() => {
  return (userEmail.value[0] || 'U').toUpperCase()
})

function handleLogout() {
  isUserMenuOpen.value = false
  emit('logout')
}
</script>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
