<script setup lang="ts">
const footerLinks = [
  {
    heading: 'Product',
    links: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  },
  {
    heading: 'Use Cases',
    links: ['Freelancers', 'Small Business', 'Accountants', 'Agencies'],
  },
  {
    heading: 'Resources',
    links: ['Documentation', 'API Reference', 'Blog', 'Status'],
  },
  {
    heading: 'Company',
    links: ['About', 'Privacy Policy', 'Terms of Service', 'Contact'],
  },
]
</script>

<template>
  <footer class="bg-app border-t border-app">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
        <div class="md:col-span-1">
          <a href="#" class="flex items-center gap-2 mb-4 no-underline">
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
            <span class="text-base font-bold text-app">ReceiptIQ</span>
          </a>
          <p class="text-sm text-secondary leading-relaxed mb-4">
            AI-powered expense tracking for modern businesses. From receipt to report in seconds.
          </p>
          <div class="flex items-center gap-2">
            <a
              href="#"
              class="w-8 h-8 rounded-lg bg-subtle hover:bg-primary-100 dark:hover:bg-primary-900/30 flex items-center justify-center text-secondary hover:text-primary-600 transition-colors no-underline"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                />
              </svg>
            </a>
            <a
              href="#"
              class="w-8 h-8 rounded-lg bg-subtle hover:bg-primary-100 dark:hover:bg-primary-900/30 flex items-center justify-center text-secondary hover:text-primary-600 transition-colors no-underline"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              class="w-8 h-8 rounded-lg bg-subtle hover:bg-primary-100 dark:hover:bg-primary-900/30 flex items-center justify-center text-secondary hover:text-primary-600 transition-colors no-underline"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
          </div>
        </div>

        <div v-for="section in footerLinks" :key="section.heading" class="md:col-span-1">
          <h4 class="text-xs font-semibold text-app uppercase tracking-wider mb-4">
            {{ section.heading }}
          </h4>
          <ul class="space-y-2.5">
            <li v-for="link in section.links" :key="link">
              <a
                href="#"
                class="text-sm text-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors no-underline"
                >{{ link }}</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-10 pt-8 border-t border-app flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p class="text-sm text-muted">© 2026 ReceiptIQ, Inc. All rights reserved.</p>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1.5 text-xs text-muted">
            <div class="w-2 h-2 rounded-full bg-primary-500"></div>
            All systems operational
          </div>
          <span class="text-xs text-muted">SOC 2 Type II</span>
          <span class="text-xs text-muted">GDPR Ready</span>
        </div>
      </div>
    </div>
  </footer>
</template>
