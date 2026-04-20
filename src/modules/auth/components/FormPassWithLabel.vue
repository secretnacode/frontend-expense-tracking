<script setup lang="ts">
import FormLabel from '@/shared/components/FormLabel.vue'
import FormPassInput from './FormPassInput.vue'
import { computed } from 'vue'
import FormErrorMessage from '@/shared/components/FormErrorMessage.vue'

const props = defineProps<{
  label: string
  error?: string[]
}>()

const passError = computed(() => props.error && props.error.length > 0)

defineOptions({ inheritAttrs: false })
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-1.5">
      <FormLabel>{{ label }}</FormLabel>

      <slot name="additional_label"></slot>
    </div>

    <div class="relative">
      <FormPassInput v-bind="$attrs" :isError="passError" />
    </div>

    <div v-if="passError">
      <FormErrorMessage :messages="error" />
    </div>
  </div>
</template>
