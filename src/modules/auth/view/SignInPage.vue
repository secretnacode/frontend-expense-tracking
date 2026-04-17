<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { SignUpForm, SignUpFormError } from '../types'
import FormInput from '@/shared/components/FormInput.vue'
import { Eye, EyeClosed } from '@lucide/vue'
import BaseInput from '@/shared/components/BaseInput.vue'
import FormErrorMessage from '@/shared/components/FormErrorMessage.vue'

const form = reactive<SignUpForm>({
  email: '',
  password: '',
  rememberMe: false,
})

const sampleError = reactive<SignUpFormError>({})

const showPass = ref<boolean>(false)

const passError = computed(() => sampleError.password && sampleError.password.length > 0)

const toggleShowPass = () => (showPass.value = !showPass.value)
</script>

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
        <h1 class="text-3xl font-bold text-app mb-2">Welcome back</h1>
        <p class="text-secondary">Sign in to your account to continue</p>
      </div>

      <div class="bg-surface rounded-2xl border border-app p-6 sm:p-8 shadow-lg">
        <form class="space-y-4">
          <FormInput
            v-model="form.email"
            label="Email Address"
            type="email"
            placeholder="you@company.com"
            :error="sampleError.email"
          />

          <div>
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label for="password" class="block text-sm font-medium text-app">Password</label>
                <a
                  href="#"
                  class="text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors no-underline"
                >
                  Forgot password?
                </a>
              </div>
              <div class="relative">
                <BaseInput
                  v-model="form.password"
                  placeholder="1234password"
                  :type="[showPass ? 'text' : 'password']"
                  :class="[passError ? 'form-error' : '']"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-secondary transition-colors border-0 bg-transparent cursor-pointer"
                  @click="toggleShowPass"
                >
                  <Eye v-if="showPass" class="size-5" />
                  <EyeClosed v-else class="size-5" />
                </button>
              </div>

              <div v-if="passError">
                <FormErrorMessage :messages="sampleError.password" />
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <input
              v-model="form.rememberMe"
              id="remember-me"
              type="checkbox"
              class="w-4 h-4 rounded border-app bg-subtle text-primary-600 focus:ring-2 focus:ring-primary-500 transition-colors cursor-pointer"
            />
            <label for="remember-me" class="text-sm text-secondary cursor-pointer"
              >Remember me</label
            >
          </div>

          <button
            type="submit"
            class="w-full py-2.5 px-4 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-0 cursor-pointer"
          >
            <span v-if="true">Sign In</span>
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
              Signing in...
            </span>
          </button>
        </form>

        <div class="mt-6 pt-6 border-t border-app">
          <p class="text-center text-sm text-secondary">
            Don't have an account?

            <span
              class="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
            >
              <RouterLink :to="{ name: 'sign-up page' }"> Sign up</RouterLink>
            </span>
          </p>
        </div>
      </div>

      <p class="text-center text-xs text-muted mt-6">
        By signing in, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  </div>
</template>
