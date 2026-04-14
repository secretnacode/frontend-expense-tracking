<template>
  <div v-if="store.activeJobs.length > 0" class="w-full max-w-2xl">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4">Processing Status</h3>

      <div class="space-y-4">
        <div
          v-for="job in store.activeJobs"
          :key="job.id"
          class="border border-gray-200 rounded-lg p-4 space-y-3"
        >
          <!-- Job Header -->
          <div class="flex items-start justify-between">
            <div>
              <p class="font-medium text-gray-900">{{ job.fileName }}</p>
              <p class="text-sm text-gray-500">
                {{ new Date(job.createdAt).toLocaleString() }}
              </p>
            </div>
            <div
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                job.status === 'processing'
                  ? 'bg-blue-100 text-blue-800'
                  : job.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800',
              ]"
            >
              {{
                job.status === 'processing'
                  ? '⏳ Processing'
                  : job.status === 'pending'
                    ? '⏰ Pending'
                    : '✅ Completed'
              }}
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Progress</span>
              <span class="font-medium">{{ job.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                :style="{ width: `${job.progress}%` }"
                class="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
              ></div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="job.errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-3">
            <p class="text-sm text-red-800">
              <span class="font-medium">Error:</span> {{ job.errorMessage }}
            </p>
          </div>

          <!-- Processing Steps -->
          <div v-if="job.status === 'processing'" class="bg-blue-50 rounded-lg p-3 space-y-2">
            <div class="flex items-center gap-2 text-sm text-blue-900">
              <span class="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span>Analyzing receipt...</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-blue-700">
              <span
                :class="[
                  'inline-block w-2 h-2 rounded-full transition-all',
                  job.progress > 30 ? 'bg-blue-500' : 'bg-blue-300',
                ]"
              ></span>
              <span>Extracting data...</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-blue-700">
              <span
                :class="[
                  'inline-block w-2 h-2 rounded-full transition-all',
                  job.progress > 60 ? 'bg-blue-500' : 'bg-blue-300',
                ]"
              ></span>
              <span>Categorizing expenses...</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-blue-700">
              <span
                :class="[
                  'inline-block w-2 h-2 rounded-full transition-all',
                  job.progress > 90 ? 'bg-blue-500' : 'bg-blue-300',
                ]"
              ></span>
              <span>Finalizing...</span>
            </div>
          </div>

          <!-- Completed Actions -->
          <div v-if="job.status === 'completed'" class="bg-green-50 rounded-lg p-3">
            <p class="text-sm text-green-800 font-medium">
              ✓ Processing complete! Review and verify the data below.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useExpenseStore } from '../stores/expenseStore'

const store = useExpenseStore()
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
