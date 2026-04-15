<script setup lang="ts">
const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Freelance Graphic Designer',
    avatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    quote:
      "Tax season used to take me two weeks of painful data entry. With ReceiptIQ I just snap receipts as I go and export a clean report in minutes. It's genuinely changed how I run my business.",
    savings: '18 hrs/month saved',
  },
  {
    name: 'Marcus Williams',
    role: 'Owner, MW Consulting LLC',
    avatar:
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    quote:
      'The AI chat assistant is a killer feature. I can ask "how much did I spend on client dinners in Q2" and get an instant answer. My accountant is asking how I got so organized.',
    savings: '$2,400 in deductions found',
  },
  {
    name: 'Priya Kapoor',
    role: 'Restaurant Owner',
    avatar:
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    quote:
      'We upload our supplier invoices every week. ReceiptIQ categorizes everything by vendor and type automatically. The spending trend alerts have already helped us cut food costs by 12%.',
    savings: '12% reduction in food costs',
  },
]
</script>

<template>
  <section id="testimonials" class="py-20 lg:py-28 bg-app">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-4"
        >
          <span class="text-xs font-semibold text-primary-700 dark:text-primary-300"
            >Customer Stories</span
          >
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-app tracking-tight mb-4">
          Loved by businesses like yours
        </h2>
        <p class="text-lg text-secondary max-w-xl mx-auto">
          Real results from real business owners who switched from spreadsheets to ReceiptIQ.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="t in testimonials"
          :key="t.name"
          class="p-6 rounded-2xl bg-surface border border-app hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-lg transition-all duration-300 flex flex-col"
        >
          <div class="flex items-center gap-1 mb-4">
            <svg
              v-for="i in 5"
              :key="i"
              class="w-4 h-4 text-accent-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </div>
          <p class="text-sm text-secondary leading-relaxed flex-1 mb-5 italic">"{{ t.quote }}"</p>
          <div class="flex items-center gap-3 pt-4 border-t border-app">
            <img :src="t.avatar" :alt="t.name" class="w-10 h-10 rounded-full object-cover" />
            <div class="flex-1">
              <p class="text-sm font-semibold text-app">{{ t.name }}</p>
              <p class="text-xs text-muted">{{ t.role }}</p>
            </div>
            <div class="px-2 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30">
              <p class="text-xs font-semibold text-primary-700 dark:text-primary-300">
                {{ t.savings }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
