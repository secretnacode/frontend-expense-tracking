<script setup lang="ts">
import BaseInput from '@/shared/components/BaseInput.vue'
import { Eye, EyeClosed } from '@lucide/vue'
import { ref } from 'vue'

defineProps<{
  isError?: boolean
}>()

const showPass = ref(false)

const toggleShowPass = () => {
  showPass.value = !showPass.value

  console.log('toggled')

  console.log(showPass)
}

defineOptions({ inheritAttrs: false })
</script>

<template>
  <BaseInput
    v-bind="$attrs"
    placeholder="1234password"
    :type="[showPass ? 'text' : 'password']"
    :isError="isError"
  />

  <button
    type="button"
    class="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-secondary transition-colors border-0 bg-transparent cursor-pointer"
    @click="toggleShowPass"
  >
    <Eye v-if="showPass" class="size-5" />
    <EyeClosed v-else class="size-5" />
  </button>
</template>
