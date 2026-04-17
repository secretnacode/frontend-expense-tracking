<script setup lang="ts"></script>

<template>
  <div class="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <a href="/" class="inline-flex items-center gap-2 mb-8 no-underline">
          <div class="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
            <svg
              class="w-6 h-6 text-white"
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
          <span class="text-xl font-bold text-app">ReceiptIQ</span>
        </a>
        <h1 class="text-3xl font-bold text-app mb-2">Create your account</h1>
        <p class="text-secondary">Join 2,400+ businesses managing expenses smarter</p>
      </div>

      <div class="bg-surface rounded-2xl border border-app p-6 sm:p-8 shadow-lg">
        <form class="space-y-4">
          <div>
            <label for="business-name" class="block text-sm font-medium text-app mb-1.5"
              >Business Name</label
            >
            <input
              id="business-name"
              type="text"
              placeholder="Your business name"
              class="w-full px-4 py-2.5 rounded-lg bg-subtle border border-app text-app placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-app mb-1.5"
              >Email Address</label
            >
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              class="w-full px-4 py-2.5 rounded-lg bg-subtle border border-app text-app placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-app mb-1.5">Password</label>
            <div class="relative">
              <input
                id="password"
                placeholder="At least 8 characters"
                class="w-full px-4 py-2.5 rounded-lg bg-subtle border border-app text-app placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-secondary transition-colors border-0 bg-transparent cursor-pointer"
              >
                <svg
                  v-if="true"
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 13.5L15.75 9.75M4.5 4.5L9.75 9.75"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label for="confirm-password" class="block text-sm font-medium text-app mb-1.5"
              >Confirm Password</label
            >
            <div class="relative">
              <input
                id="confirm-password"
                placeholder="Confirm your password"
                class="w-full px-4 py-2.5 rounded-lg bg-subtle border border-app text-app placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-secondary transition-colors border-0 bg-transparent cursor-pointer"
              >
                <svg
                  v-if="true"
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 13.5L15.75 9.75M4.5 4.5L9.75 9.75"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- <div
              v-if="validationError"
              class="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
            >
              <p class="text-sm text-red-700 dark:text-red-400">{{ validationError }}</p>
            </div>

            <div
              v-if="authError"
              class="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
            >
              <p class="text-sm text-red-700 dark:text-red-400">{{ authError }}</p>
            </div>

            <div
              v-if="successMessage"
              class="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
            >
              <p class="text-sm text-green-700 dark:text-green-400">{{ successMessage }}</p>
            </div> -->

          <button
            type="submit"
            class="w-full py-2.5 px-4 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-0 cursor-pointer"
          >
            <span v-if="true">Create Account</span>

            <span v-else class="flex items-center justify-center gap-2">
              <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating account...
            </span>
          </button>
        </form>

        <div class="mt-6 pt-6 border-t border-app">
          <p class="text-center text-sm text-secondary">
            Already have an account?
            <span
              class="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
            >
              <RouterLink :to="{ name: 'sign-in page' }"> Sign in</RouterLink>
            </span>
          </p>
        </div>
      </div>

      <p class="text-center text-xs text-muted mt-6">
        By signing up, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  </div>
</template>
