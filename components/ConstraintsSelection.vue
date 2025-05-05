<script setup lang="ts">
const constraints = defineModel<string>()

defineEmits<{
  nextStep: []
}>()
</script>

<template>
  <div class="flex flex-col gap-4">
      <textarea
          v-model="constraints"
          rows="4"
          placeholder="Ex: canapé 6 places, frigo intégré, lumière naturelle..."
          class="w-full border border-slate-300 p-3 rounded-xl text-lg resize-none focus:outline-none"
      />
    <div class="flex justify-end">
      <button class="px-4 py-2 bg-blue-500 text-white rounded-xl" @click="$emit('nextStep')">Next</button>
    </div>
  </div>
</template>

<style scoped>

</style>