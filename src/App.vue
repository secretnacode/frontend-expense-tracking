<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTheme } from './shared/composables/useTheme'

useTheme()
</script>

<template>
  <RouterView />
</template>
