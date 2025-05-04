<script setup lang="ts">
defineProps<{
  isPrimary ?: boolean
  disabled ?: boolean
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button :class="{
    'px-4 py-2 rounded-xl w-full text-2xl flex items-center justify-center gap-2 shadow': true,
    'bg-blue-700 text-white': isPrimary,
    'bg-white': !isPrimary,
  }" @click="emit('click')" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>

</style>