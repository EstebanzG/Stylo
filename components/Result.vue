<script setup lang="ts">
defineProps<{
  uploadedImage: string,
  generatedImage: string | null,
}>()
</script>

<template>
  <div v-if="generatedImage" class="w-full flex flex-col items-center gap-4 mt-6 relative">
    <img
        :src="generatedImage"
        alt="Generated design"
        class="w-full h-auto rounded-xl"
    />
    <a :href="generatedImage" download="generated-image.jpg" class="self-end">
      <action-button color="blue">
        Download
      </action-button>
    </a>
  </div>

  <div v-else class="relative w-full flex justify-center mt-6">
    <img
        :src="uploadedImage"
        alt="Uploaded image"
        class="w-full h-auto rounded-xl"
        style="filter: blur(8px);"
    />

    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-10 h-10 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  </div>
</template>


<style scoped>

</style>