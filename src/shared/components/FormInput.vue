<script setup lang="ts">
import { computed } from 'vue'
import BaseInput from './BaseInput.vue'
import FormErrorMessage from './FormErrorMessage.vue'
import FormLabel from './FormLabel.vue'

const model = defineModel<string | number>({ required: true })

const props = defineProps<{
  label: string
  error?: string[]
}>()

const hasErrors = computed(() => props.error && props.error.length > 0)

defineOptions({ inheritAttrs: false })
</script>

<template>
  <div>
    <FormLabel>{{ label }}</FormLabel>

    <BaseInput v-bind="$attrs" v-model="model" :isError="hasErrors" />

    <div v-if="hasErrors">
      <FormErrorMessage :messages="error" />
    </div>
  </div>
</template>
