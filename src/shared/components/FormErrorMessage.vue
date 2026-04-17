<script setup lang="ts">
import { AlertCircle } from '@lucide/vue'
import { computed } from 'vue'

const props = defineProps<{ messages?: string[] }>()

const hasMessage = computed(() => props.messages && props.messages.length > 0)
</script>

<template>
  <div v-if="hasMessage" class="mt-2 flex flex-col gap-1.5">
    <div v-for="message in messages" :key="message" class="flex items-center gap-2 px-1">
      <AlertCircle class="size-4 text-red-500" />

      <span class="text-xs leading-none text-red-600 dark:text-red-400">
        {{ message }}
      </span>
    </div>
  </div>
</template>
