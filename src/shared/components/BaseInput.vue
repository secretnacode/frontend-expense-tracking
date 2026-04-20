<script setup lang="ts">
defineProps<{ isError?: boolean }>()
</script>

<template>
  <input
    id="email"
    class="w-full px-4 py-2.5 rounded-lg bg-subtle border border-app text-app placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
    :class="[isError ? 'form-error' : '']"
  />
</template>
