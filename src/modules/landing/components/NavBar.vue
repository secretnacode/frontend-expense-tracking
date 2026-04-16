<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '../../../shared/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  // { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
]
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-surface/90 backdrop-blur-md border-b border-app"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <a href="#" class="flex items-center gap-2 no-underline">
          <div class="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <svg
              class="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <span class="text-lg font-bold text-app">ReceiptIQ</span>
        </a>

        <div class="hidden md:flex items-center gap-8">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="text-sm font-medium text-secondary hover:text-primary-600 transition-colors duration-200 no-underline"
          >
            {{ link.label }}
          </a>
        </div>

        <div class="hidden md:flex items-center gap-3">
          <button
            @click="toggleTheme"
            class="w-9 h-9 rounded-lg flex items-center justify-center bg-subtle hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200 text-app border-0 cursor-pointer"
            aria-label="Toggle theme"
          >
            <svg
              v-if="!isDark"
              class="w-4 h-4 text-accent-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <svg
              v-else
              class="w-4 h-4 text-accent-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>
          <RouterLink
            :to="{ name: 'sign-in page' }"
            class="text-sm font-medium text-secondary hover:text-primary-600 transition-colors no-underline"
            >Log in
          </RouterLink>
          <a
            href="#"
            class="text-sm font-semibold px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors duration-200 no-underline"
          >
            Get Started Free
          </a>
        </div>

        <div class="flex md:hidden items-center gap-2">
          <button
            @click="toggleTheme"
            class="w-9 h-9 rounded-lg flex items-center justify-center bg-subtle transition-colors duration-200 text-app border-0 cursor-pointer"
          >
            <svg
              v-if="!isDark"
              class="w-4 h-4 text-accent-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <svg
              v-else
              class="w-4 h-4 text-accent-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>
          <button
            @click="mobileOpen = !mobileOpen"
            class="w-9 h-9 rounded-lg flex items-center justify-center bg-subtle text-app border-0 cursor-pointer"
          >
            <svg
              v-if="!mobileOpen"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="mobileOpen" class="md:hidden pb-4 pt-2 border-t border-app mt-0">
        <div class="flex flex-col gap-1 pt-3">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="text-sm font-medium text-secondary hover:text-primary-600 px-2 py-2 rounded-lg hover:bg-subtle transition-colors no-underline"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </a>
          <div class="flex flex-col gap-2 mt-3 pt-3 border-t border-app">
            <a href="#" class="text-sm font-medium text-secondary px-2 py-2 no-underline">Log in</a>
            <a
              href="#"
              class="text-sm font-semibold px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-center transition-colors no-underline"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
