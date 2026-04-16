<script setup lang="ts">
import AuthLayout from '../components/AuthLayout.vue'
</script>

<template>
  <AuthLayout>
    <template #title>log in page po ito</template>

    <template #form>
      <form action="">
        <div>
          <label for="">email</label>
          <input type="text" />
        </div>

        <div>
          <label for="">password</label>
          <input type="text" />
        </div>
      </form>
    </template>
  </AuthLayout>
</template>
