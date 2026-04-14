import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface ExtractedExpense {
  id: string
  date: string
  amount: number
  category: string
  vendor: string
  description: string
  receiptId: string
  isVerified: boolean
  originalData: Record<string, unknown>
}

export interface ProcessingJob {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  fileName: string
  receiptId: string
  errorMessage?: string
  createdAt: Date
}

export interface FinancialData {
  totalSpending: number
  categoryBreakdown: Record<string, number>
  expenses: ExtractedExpense[]
  monthlySpending: Record<string, number>
}

export const useExpenseStore = defineStore('expense', () => {
  // State
  const expenses = ref<ExtractedExpense[]>([])
  const processingJobs = ref<ProcessingJob[]>([])
  const financialData = ref<FinancialData>({
    totalSpending: 0,
    categoryBreakdown: {},
    expenses: [],
    monthlySpending: {},
  })
  const webSocketConnection = ref<WebSocket | null>(null)
  const isConnected = ref(false)
  const currentUser = ref<{ id: string; email: string } | null>(null)

  // Computed
  const totalSpending = computed(() => expenses.value.reduce((sum, exp) => sum + exp.amount, 0))

  const categoryBreakdown = computed(() => {
    const breakdown: Record<string, number> = {}
    expenses.value.forEach((exp) => {
      breakdown[exp.category] = (breakdown[exp.category] || 0) + exp.amount
    })
    return breakdown
  })

  const verifiedExpenses = computed(() => expenses.value.filter((exp) => exp.isVerified))

  const pendingExpenses = computed(() => expenses.value.filter((exp) => !exp.isVerified))

  const activeJobs = computed(() =>
    processingJobs.value.filter((job) => job.status === 'processing' || job.status === 'pending'),
  )

  // Methods
  function initializeWebSocket(userId: string) {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const wsUrl = `${protocol}//localhost:8080/ws/${userId}`

    webSocketConnection.value = new WebSocket(wsUrl)

    webSocketConnection.value.onopen = () => {
      isConnected.value = true
      console.log('WebSocket connected')
    }

    webSocketConnection.value.onmessage = (event) => {
      const data = JSON.parse(event.data)
      handleWebSocketMessage(data)
    }

    webSocketConnection.value.onerror = (error) => {
      console.error('WebSocket error:', error)
      isConnected.value = false
    }

    webSocketConnection.value.onclose = () => {
      isConnected.value = false
      console.log('WebSocket disconnected')
    }
  }

  function handleWebSocketMessage(data: Record<string, unknown>) {
    if (data.type === 'processing_update') {
      const jobId = data.jobId as string
      const progress = data.progress as number
      const job = processingJobs.value.find((j) => j.id === jobId)
      if (job) {
        job.progress = progress
      }
    } else if (data.type === 'processing_complete') {
      const jobId = data.jobId as string
      const expenses_data = data.expenses as ExtractedExpense[]
      const job = processingJobs.value.find((j) => j.id === jobId)
      if (job) {
        job.status = 'completed'
        job.progress = 100
      }
      // Add new expenses to the list
      expenses.value.push(...expenses_data)
    } else if (data.type === 'processing_error') {
      const jobId = data.jobId as string
      const error = data.error as string
      const job = processingJobs.value.find((j) => j.id === jobId)
      if (job) {
        job.status = 'failed'
        job.errorMessage = error
      }
    }
  }

  async function uploadReceipt(file: File): Promise<ProcessingJob> {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/receipts/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      const job: ProcessingJob = {
        id: data.jobId,
        status: 'pending',
        progress: 0,
        fileName: file.name,
        receiptId: data.receiptId,
        createdAt: new Date(),
      }

      processingJobs.value.push(job)
      return job
    } catch (error) {
      console.error('Failed to upload receipt:', error)
      throw error
    }
  }

  async function uploadCSV(file: File): Promise<ProcessingJob> {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/csv/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      const job: ProcessingJob = {
        id: data.jobId,
        status: 'pending',
        progress: 0,
        fileName: file.name,
        receiptId: data.jobId,
        createdAt: new Date(),
      }

      processingJobs.value.push(job)
      return job
    } catch (error) {
      console.error('Failed to upload CSV:', error)
      throw error
    }
  }

  function updateExpense(expenseId: string, updates: Partial<ExtractedExpense>) {
    const expense = expenses.value.find((exp) => exp.id === expenseId)
    if (expense) {
      Object.assign(expense, updates, { isVerified: true })
    }
  }

  function deleteExpense(expenseId: string) {
    const index = expenses.value.findIndex((exp) => exp.id === expenseId)
    if (index > -1) {
      expenses.value.splice(index, 1)
    }
  }

  async function fetchExpenses(filters?: {
    startDate?: string
    endDate?: string
    category?: string
  }) {
    try {
      const params = new URLSearchParams()
      if (filters?.startDate) params.append('startDate', filters.startDate)
      if (filters?.endDate) params.append('endDate', filters.endDate)
      if (filters?.category) params.append('category', filters.category)

      const response = await fetch(`/api/expenses?${params.toString()}`)
      const data = await response.json()
      expenses.value = data.expenses
      financialData.value = data.financialData
    } catch (error) {
      console.error('Failed to fetch expenses:', error)
    }
  }

  function setCurrentUser(user: { id: string; email: string }) {
    currentUser.value = user
  }

  return {
    // State
    expenses,
    processingJobs,
    financialData,
    isConnected,
    currentUser,
    // Computed
    totalSpending,
    categoryBreakdown,
    verifiedExpenses,
    pendingExpenses,
    activeJobs,
    // Methods
    initializeWebSocket,
    uploadReceipt,
    uploadCSV,
    updateExpense,
    deleteExpense,
    fetchExpenses,
    setCurrentUser,
  }
})
