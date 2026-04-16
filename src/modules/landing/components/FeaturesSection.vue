<script setup lang="ts">
import { CameraIcon, MessageSquareShareIcon, FileCheck2Icon } from '@lucide/vue'

// keeping original data but adapting structure slightly
const features = [
  {
    title: 'Snap & Extract',
    description:
      'Take a photo. Our neural engine extracts vendors, taxes, and totals with 99% accuracy. No more typing.',
    icon: CameraIcon,
    highlight: false, // Changed from template logic
    tags: ['99% OCR', 'Auto-Sync'],
  },
  {
    title: 'Health Assistant',
    description:
      "Chat with your data. Ask 'Can I afford this?' or 'How much tax do I owe?' and get instant, real-time answers.",
    icon: MessageSquareShareIcon,
    highlight: true, // Center highlighted as in the screenshot
    tags: ['Realtime AI', 'Live Flow'],
  },
  {
    title: 'Audit Protection',
    description:
      "Every receipt is categorized and stored in a secure vault. Tax season becomes a simple 'Export' click.",
    icon: FileCheck2Icon,
    highlight: false,
    tags: ['Audit Ready', 'CSV Export'],
  },
]
</script>

<template>
  <section id="features" class="py-24 px-6 text-neutral-100">
    <div class="max-w-7xl mx-auto">
      <header class="text-center mb-20">
        <span
          class="inline-block px-4 py-1.5 rounded-full bg-[#111827] border border-primary-900 text-primary-400 text-sm font-semibold tracking-wide uppercase mb-4"
        >
          Next-Gen Accounting
        </span>
        <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-app">
          Stop manual entry. <span class="text-primary-400">Start growing.</span>
        </h2>
        <p class="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Our AI handles the heavy lifting so you can focus on your business, not your shoebox of
          receipts.
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          :class="[
            'relative flex flex-col p-8 rounded-3xl border bg-[#111827] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1',
            /* Highlighting logic from screenshot (Teal on far left, Amber/Gold centered) */
            index === 1 ? 'border-accent-300 ring-1 ring-accent-100' : 'border-neutral-800',
          ]"
        >
          <div class="flex items-center gap-1 mb-6 text-accent-500">
            <svg v-for="i in 5" :key="i" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </div>

          <blockquote class="flex-grow text-neutral-300 leading-relaxed mb-8 italic text-base">
            "{{ feature.description }}"
          </blockquote>

          <div
            class="flex items-center justify-between gap-4 border-t border-neutral-800 pt-6 mt-auto"
          >
            <div class="flex items-center gap-3">
              <div
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0',
                  /* Dynamic Icon colors matched to screenshot usage (Sarah uses Teal, Marcus uses Gold) */
                  index === 1
                    ? 'bg-accent-950 border-accent-800 text-accent-400'
                    : 'bg-primary-950 border-primary-900 text-primary-400',
                ]"
              >
                <component :is="feature.icon" class="w-5 h-5" />
              </div>
              <div class="min-w-0">
                <p class="font-semibold text-white text-[13px] leading-tight truncate">
                  {{ feature.title }}
                </p>
                <p class="text-[10px] text-neutral-500 mt-1 uppercase tracking-wider font-bold">
                  Automation Active
                </p>
              </div>
            </div>

            <span
              class="px-3 py-1.5 text-[11px] font-bold rounded-full whitespace-nowrap shadow-sm"
              :class="[
                /* Amber/Gold for the center highlighted card, Teal for standard ones */
                index === 1 ? 'bg-accent-500 text-white' : 'bg-primary-600 text-white',
              ]"
            >
              {{ feature.tags[0] }}
            </span>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <p class="text-neutral-500 text-sm font-medium">
          Trusted by over 2,000+ freelancers and small agencies worldwide.
        </p>
      </div>
    </div>
  </section>
</template>
