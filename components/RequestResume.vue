<script setup lang="ts">
const constraints = defineModel<string>()

defineProps<{
  style: string
  previewUrl: string | null
  isLoading: boolean
}>()

defineEmits<{
  startProcess: []
}>()
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <p><strong>Style choisi :</strong> {{ style }}</p>
      <p><strong>Contraintes :</strong> {{ constraints || 'Aucune' }}</p>
      <p><strong>Image :</strong></p>
      <img
          v-if="previewUrl" :src="previewUrl" alt="Preview"
          class="rounded-xl w-full max-h-[300px] object-contain"
      />
    </div>

    <div class="flex justify-between items-center">
      <action-button is-primary @click="$emit('startProcess')" :disabled="isLoading">
        <span v-if="!isLoading">Generate</span>
        <span v-else>Generating...</span>
        <Icon name="heroicons:rocket-launch" size="40px" class="bg-white"/>
      </action-button>
    </div>
  </div>
</template>

<style scoped>

</style>