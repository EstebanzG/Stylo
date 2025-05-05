<script setup lang="ts">
const style = defineModel<string>()

defineEmits<{
  nextStep: []
}>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <select
        v-model="style"
        class="w-full border border-slate-300 p-3 rounded-xl text-lg focus:outline-none"
    >
      <option disabled value="">Choose a style</option>
      <option>Modern minimalist</option>
      <option>Japanese zen</option>
      <option>Scandinavian</option>
      <option>Industrial loft</option>
      <option>Classic European</option>
    </select>
    <div class="flex justify-end">
      <button
          class="px-4 py-2 bg-blue-500 text-white rounded-xl"
          :disabled="!style"
          @click="$emit('nextStep')"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>