<template>
  <div class="w-full max-w-2xl">
    <div class="bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Upload Receipt or CSV</h2>

      <div class="space-y-6">
        <!-- Receipt Upload Tab -->
        <div class="border-b border-gray-200">
          <button
            v-for="tab in ['receipt', 'csv']"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'px-6 py-3 font-medium border-b-2 transition-colors',
              activeTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900',
            ]"
          >
            {{ tab === 'receipt' ? '📸 Receipt Photo' : '📊 CSV File' }}
          </button>
        </div>

        <!-- Receipt Upload -->
        <div v-if="activeTab === 'receipt'" class="space-y-4">
          <div
            @dragover="isDraggingReceipt = true"
            @dragleave="isDraggingReceipt = false"
            @drop="handleReceiptDrop"
            :class="[
              'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
              isDraggingReceipt
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400',
            ]"
          >
            <input
              ref="receiptInput"
              type="file"
              accept="image/*"
              @change="handleReceiptChange"
              class="hidden"
            />
            <div @click="receiptInput?.click()" class="cursor-pointer">
              <div class="text-4xl mb-2">📷</div>
              <p class="font-medium text-gray-900">Click to upload or drag and drop</p>
              <p class="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>

          <div v-if="receiptPreview" class="space-y-3">
            <div class="text-sm font-medium text-gray-700">Preview:</div>
            <img :src="receiptPreview" alt="Receipt preview" class="max-h-64 rounded-lg" />
          </div>
        </div>

        <!-- CSV Upload -->
        <div v-if="activeTab === 'csv'" class="space-y-4">
          <div
            @dragover="isDraggingCSV = true"
            @dragleave="isDraggingCSV = false"
            @drop="handleCSVDrop"
            :class="[
              'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
              isDraggingCSV
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400',
            ]"
          >
            <input
              ref="csvInput"
              type="file"
              accept=".csv,.xls,.xlsx"
              @change="handleCSVChange"
              class="hidden"
            />
            <div @click="csvInput?.click()" class="cursor-pointer">
              <div class="text-4xl mb-2">📂</div>
              <p class="font-medium text-gray-900">Click to upload or drag and drop</p>
              <p class="text-sm text-gray-500">CSV, XLS, XLSX up to 25MB</p>
            </div>
          </div>

          <div v-if="csvFileName" class="text-sm text-gray-600">
            Selected: <span class="font-medium">{{ csvFileName }}</span>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          @click="handleUpload"
          :disabled="!canUpload || isUploading"
          :class="[
            'w-full py-3 px-4 rounded-lg font-medium transition-all',
            canUpload && !isUploading
              ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed',
          ]"
        >
          <span v-if="isUploading" class="flex items-center justify-center gap-2">
            <span
              class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
            ></span>
            Uploading...
          </span>
          <span v-else>Upload {{ activeTab === 'receipt' ? 'Receipt' : 'CSV' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useExpenseStore } from '../stores/expenseStore'

const store = useExpenseStore()

const activeTab = ref<'receipt' | 'csv'>('receipt')
const receiptInput = ref<HTMLInputElement>()
const csvInput = ref<HTMLInputElement>()
const isDraggingReceipt = ref(false)
const isDraggingCSV = ref(false)
const receiptPreview = ref<string>('')
const csvFileName = ref<string>('')
const selectedReceiptFile = ref<File | null>(null)
const selectedCSVFile = ref<File | null>(null)
const isUploading = ref(false)

const canUpload = computed(() => {
  return activeTab.value === 'receipt' ? selectedReceiptFile.value : selectedCSVFile.value
})

function handleReceiptChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files?.[0]) {
    selectedReceiptFile.value = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      receiptPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(target.files[0])
  }
}

function handleReceiptDrop(event: DragEvent) {
  event.preventDefault()
  isDraggingReceipt.value = false
  if (event.dataTransfer?.files?.[0]) {
    selectedReceiptFile.value = event.dataTransfer.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      receiptPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(event.dataTransfer.files[0])
  }
}

function handleCSVChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files?.[0]) {
    selectedCSVFile.value = target.files[0]
    csvFileName.value = target.files[0].name
  }
}

function handleCSVDrop(event: DragEvent) {
  event.preventDefault()
  isDraggingCSV.value = false
  if (event.dataTransfer?.files?.[0]) {
    selectedCSVFile.value = event.dataTransfer.files[0]
    csvFileName.value = event.dataTransfer.files[0].name
  }
}

async function handleUpload() {
  if (!canUpload.value) return

  isUploading.value = true
  try {
    if (activeTab.value === 'receipt' && selectedReceiptFile.value) {
      await store.uploadReceipt(selectedReceiptFile.value)
      selectedReceiptFile.value = null
      receiptPreview.value = ''
    } else if (activeTab.value === 'csv' && selectedCSVFile.value) {
      await store.uploadCSV(selectedCSVFile.value)
      selectedCSVFile.value = null
      csvFileName.value = ''
    }
  } catch (error) {
    console.error('Upload failed:', error)
  } finally {
    isUploading.value = false
  }
}
</script>
