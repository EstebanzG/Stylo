<script setup lang="ts">
defineProps<{
  color ?: "blue" | "white"
  disabled ?: boolean
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button :class="{
    'px-4 py-2 rounded-xl flex items-center justify-center gap-2': true,
    'bg-blue-500 hover:bg-blue-600 text-white': color === 'blue',
    'bg-white border hover:bg-slate-100': color === 'white',
    'transition-all duration-150 active:scale-95': !disabled,
    'opacity-50 cursor-not-allowed': disabled
  }" @click="emit('click')" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>

</style>