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
      <action-button
          color="blue"
          :disabled="!style"
          @click="$emit('nextStep')"
      >
        Next
      </action-button>
    </div>
  </div>
</template>

<style scoped>

</style>