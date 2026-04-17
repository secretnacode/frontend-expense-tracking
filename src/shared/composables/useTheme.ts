import { ref, watch, onMounted } from 'vue'

const saved = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const isDark = ref(saved ? saved === 'dark' : prefersDark)

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  const applyTheme = (val: boolean) => {
    if (val) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  applyTheme(isDark.value)

  watch(isDark, (val) => applyTheme(val))

  return { isDark, toggleTheme }
}
