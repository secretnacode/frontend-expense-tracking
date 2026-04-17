<script setup lang="ts">
import { Eye, Zap } from '@lucide/vue'
</script>

<template>
  <section class="relative pt-25 pb-20 lg:pb-32 overflow-hidden bg-app">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl"
      ></div>
      <div class="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-accent-400/10 blur-3xl"></div>
      <div
        class="absolute bottom-0 right-1/3 w-64 h-64 rounded-full bg-primary-400/8 blur-3xl"
      ></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div class="flex-1 text-center lg:text-left">
          <div
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-6"
          >
            <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            <span class="text-xs font-semibold text-primary-700 dark:text-primary-300"
              >AI-Powered Financial Intelligence</span
            >
          </div>

          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-app leading-tight tracking-tight mb-6"
          >
            Stop Drowning in
            <span class="relative">
              <span class="text-primary-600 dark:text-primary-400"> Receipts.</span>
            </span>
            <br />
            Start
            <span class="text-accent-500"> Saving Time.</span>
          </h1>

          <p
            class="text-lg sm:text-xl text-secondary leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
          >
            Snap a photo. Upload a CSV. Let AI handle the rest. ReceiptIQ automatically categorizes
            expenses, extracts key data, and gives you a financial health assistant — built for
            freelancers and small businesses.
          </p>

          <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <a
              href="#"
              class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40 hover:-translate-y-0.5 no-underline"
            >
              <Zap class="size-4" />
              Start for Free
            </a>
            <a
              href="#how-it-works"
              class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface hover:bg-subtle border border-app text-app font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 no-underline"
            >
              <Eye class="size-4" />
              View Demo
            </a>
          </div>

          <div class="flex items-center gap-6 mt-8 justify-center lg:justify-start">
            <div class="flex -space-x-2">
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
                class="w-8 h-8 rounded-full border-2 border-surface object-cover"
                alt="User"
              />
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
                class="w-8 h-8 rounded-full border-2 border-surface object-cover"
                alt="User"
              />
              <img
                src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
                class="w-8 h-8 rounded-full border-2 border-surface object-cover"
                alt="User"
              />
              <div
                class="w-8 h-8 rounded-full border-2 border-surface bg-primary-600 flex items-center justify-center text-xs font-bold text-white"
              >
                +
              </div>
            </div>
            <p class="text-sm text-secondary">
              <span class="font-semibold text-app">2,400+</span> businesses already saving time
            </p>
          </div>
        </div>

        <div class="flex-1 w-full max-w-lg lg:max-w-none">
          <div class="relative">
            <div class="rounded-2xl overflow-hidden shadow-2xl border border-app bg-surface">
              <div class="bg-subtle px-4 py-3 flex items-center gap-2 border-b border-app">
                <div class="flex gap-1.5">
                  <div class="w-3 h-3 rounded-full bg-red-400"></div>
                  <div class="w-3 h-3 rounded-full bg-accent-400"></div>
                  <div class="w-3 h-3 rounded-full bg-primary-400"></div>
                </div>
                <div class="flex-1 mx-3 h-5 rounded-md bg-app flex items-center px-3">
                  <span class="text-xs text-muted">app.receiptiq.com/dashboard</span>
                </div>
              </div>

              <div class="p-5 space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs text-muted font-medium uppercase tracking-wide">
                      Total Expenses
                    </p>
                    <p class="text-2xl font-bold text-app">$4,821.50</p>
                  </div>
                  <div
                    class="px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold"
                  >
                    -12% vs last month
                  </div>
                </div>

                <div class="grid grid-cols-3 gap-2">
                  <div class="rounded-xl p-3 bg-subtle">
                    <p class="text-xs text-muted mb-1">Food & Dining</p>
                    <p class="text-sm font-bold text-app">$642</p>
                    <div class="mt-2 h-1.5 rounded-full bg-app overflow-hidden">
                      <div class="h-full w-3/5 rounded-full bg-primary-500"></div>
                    </div>
                  </div>
                  <div class="rounded-xl p-3 bg-subtle">
                    <p class="text-xs text-muted mb-1">Travel</p>
                    <p class="text-sm font-bold text-app">$1,280</p>
                    <div class="mt-2 h-1.5 rounded-full bg-app overflow-hidden">
                      <div class="h-full w-4/5 rounded-full bg-accent-500"></div>
                    </div>
                  </div>
                  <div class="rounded-xl p-3 bg-subtle">
                    <p class="text-xs text-muted mb-1">Software</p>
                    <p class="text-sm font-bold text-app">$349</p>
                    <div class="mt-2 h-1.5 rounded-full bg-app overflow-hidden">
                      <div class="h-full w-2/5 rounded-full bg-teal-500"></div>
                    </div>
                  </div>
                </div>

                <div
                  class="rounded-xl p-3 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/50"
                >
                  <div class="flex items-start gap-2">
                    <div
                      class="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center shrink-0 mt-0.5"
                    >
                      <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p class="text-xs font-semibold text-primary-700 dark:text-primary-300">
                        AI Insight
                      </p>
                      <p class="text-xs text-primary-600 dark:text-primary-400 mt-0.5">
                        Your travel spending is 40% higher than industry average. Consider booking
                        earlier to save ~$320/month.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="space-y-2">
                  <div
                    class="flex items-center gap-3 p-2.5 rounded-lg hover:bg-subtle transition-colors"
                  >
                    <div
                      class="w-8 h-8 rounded-lg bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center"
                    >
                      <svg
                        class="w-4 h-4 text-accent-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-xs font-semibold text-app">Whole Foods Market</p>
                      <p class="text-xs text-muted">Today, 2:14 PM • Food & Dining</p>
                    </div>
                    <span class="text-sm font-bold text-app">-$84.32</span>
                  </div>
                  <div
                    class="flex items-center gap-3 p-2.5 rounded-lg hover:bg-subtle transition-colors"
                  >
                    <div
                      class="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center"
                    >
                      <svg
                        class="w-4 h-4 text-primary-600"
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
                    <div class="flex-1">
                      <p class="text-xs font-semibold text-app">Adobe Creative Cloud</p>
                      <p class="text-xs text-muted">Yesterday • Software</p>
                    </div>
                    <span class="text-sm font-bold text-app">-$54.99</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="absolute -top-4 -right-4 bg-surface rounded-xl shadow-xl p-3 border border-app hidden sm:block"
            >
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                  <svg
                    class="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-xs font-semibold text-app">Receipt Scanned</p>
                  <p class="text-xs text-muted">AI categorized in 1.2s</p>
                </div>
              </div>
            </div>

            <div
              class="absolute -bottom-4 -left-4 bg-surface rounded-xl shadow-xl p-3 border border-app hidden sm:block"
            >
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center">
                  <svg
                    class="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-xs font-semibold text-app">Tax Ready</p>
                  <p class="text-xs text-muted">12 deductions found</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
