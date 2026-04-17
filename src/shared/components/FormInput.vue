<script setup lang="ts">
import { computed } from 'vue'
import BaseInput from './BaseInput.vue'
import FormErrorMessage from './FormErrorMessage.vue'

const model = defineModel<string | number>({ required: true })

const props = defineProps<{
  label: string
  error?: string[]
}>()

const hasErrors = computed(() => props.error && props.error.length > 0)

console.log(props.error)

defineOptions({ inheritAttrs: false })
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-app mb-1.5">{{ label }}</label>

    <BaseInput v-bind="$attrs" v-model="model" :class="[hasErrors ? 'form-error' : '']" />

    <div v-if="hasErrors">
      <FormErrorMessage :messages="error" />
    </div>
  </div>
</template>
