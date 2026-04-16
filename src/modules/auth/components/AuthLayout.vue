<template>
  <div class="grid col-span-2 grid-flow-col h-screen">
    <div class="bg-red-100">ui design</div>
    <div class="flex flex-col justify-center items-center">
      <p>form to</p>

      <slot name="title" />

      <main>
        <slot name="form"></slot>
      </main>
    </div>
  </div>
</template>
