<script setup lang="ts">
const steps = [
  {
    number: '01',
    title: 'Upload or Snap',
    description:
      'Take a photo of your receipt or drag & drop a bank CSV export. We accept any format — no templates required.',
    icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
  },
  {
    number: '02',
    title: 'AI Processes Everything',
    description:
      'Our vision AI reads every detail and categorizes each expense using your spending history and industry benchmarks.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    number: '03',
    title: 'Review & Confirm',
    description:
      'Glance at the auto-filled details. One-tap corrections train the AI to be even more accurate next time.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    number: '04',
    title: 'Get Insights & Export',
    description:
      'Chat with your financial assistant, track budgets in real time, and export polished reports for tax season.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
]
</script>

<template>
  <section id="how-it-works" class="py-20 lg:py-28 bg-subtle">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800 mb-4"
        >
          <span class="text-xs font-semibold text-accent-700 dark:text-accent-400"
            >Simple Process</span
          >
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-app tracking-tight mb-4">
          From receipt to insight in 4 steps
        </h2>
        <p class="text-lg text-secondary max-w-2xl mx-auto">
          Designed for busy professionals — the entire flow takes less time than entering a single
          expense manually.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <div
          class="hidden lg:block absolute top-10 left-1/4 right-1/4 h-px bg-primary-200 dark:bg-primary-800/50"
          style="width: calc(75% - 2rem); left: calc(12.5% + 1rem)"
        ></div>

        <div
          v-for="(step, index) in steps"
          :key="step.number"
          class="relative flex flex-col items-center text-center p-6"
        >
          <div class="relative mb-5">
            <div
              class="w-16 h-16 rounded-2xl bg-surface border-2 border-primary-200 dark:border-primary-800 flex items-center justify-center shadow-md relative z-10"
            >
              <svg
                class="w-7 h-7 text-primary-600 dark:text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" :d="step.icon" />
              </svg>
            </div>
            <div
              class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center z-20"
            >
              <span class="text-xs font-bold text-white">{{ index + 1 }}</span>
            </div>
          </div>
          <h3 class="text-base font-bold text-app mb-2">{{ step.title }}</h3>
          <p class="text-sm text-secondary leading-relaxed">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
