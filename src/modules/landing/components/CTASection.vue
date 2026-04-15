<script setup lang="ts"></script>

<template>
  <section class="py-20 lg:py-28 bg-subtle">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="relative rounded-3xl overflow-hidden p-10 sm:p-16 bg-primary-600">
        <div
          class="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3 pointer-events-none"
        ></div>
        <div
          class="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-primary-500/30 -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-2xl"
        ></div>

        <div class="relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 mb-6">
            <span class="text-xs font-semibold text-white"
              >Free for 14 days — no credit card needed</span
            >
          </div>
          <h2
            class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            Ready to reclaim your time?
          </h2>
          <p class="text-lg text-primary-100 max-w-xl mx-auto mb-8 leading-relaxed">
            Join 2,400+ businesses that have already ditched spreadsheets. Set up takes less than 5
            minutes.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#"
              class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-primary-50 text-primary-700 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-lg no-underline"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Start Free Trial
            </a>
            <a
              href="#"
              class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-transparent hover:bg-white/10 border-2 border-white/40 hover:border-white/60 text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 no-underline"
            >
              Schedule a Demo
            </a>
          </div>
          <p class="text-xs text-primary-200 mt-5">
            No credit card required • Cancel anytime • SOC 2 Type II compliant
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
