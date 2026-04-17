<script setup lang="ts">
import { computed } from 'vue'
import type { BaseButtonSize, BaseButtonState } from '../types'

withDefaults(
  defineProps<{
    state: BaseButtonState
    size: BaseButtonSize
    isDisable: boolean
    hasIcon: boolean
  }>(),
  {
    state: 'default',
    size: 'md',
    isDisable: false,
    hasIcon: false,
  },
)

const buttonStyle = computed(() => {
  return []
})
</script>

<template>
  <button :class="buttonStyle">
    <slot />
  </button>
</template>
s
