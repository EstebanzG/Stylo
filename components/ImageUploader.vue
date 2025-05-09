<script setup lang="ts">
import {ref} from "vue";

defineProps<{
  selectedFile: File | null,
  previewUrl: string | null
}>();

const emit = defineEmits<{
  setSelectedFile: [file: File]
  nextStep: []
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    emit('setSelectedFile', file)
  }
}

</script>

<template>
  <input type="file" ref="fileInputRef" class="hidden" accept="image/*" @change="onFileChange"/>

  <div
      v-if="!selectedFile"
      class="h-[400px] bg-white border-4 border-lightBlue rounded-xl flex flex-col justify-center items-center gap-5 cursor-pointer shadow"
      @click="fileInputRef?.click()"
  >
    <upload-icon/>
    <span class="text-xl text-slate-600 text-center">Click to upload your image</span>
  </div>

  <div v-if="selectedFile" class="flex flex-col items-center gap-4">
    <img
        v-if="previewUrl"
        :src="previewUrl"
        alt="Preview"
        class="w-full h-auto cursor-pointer"
        @click="fileInputRef?.click()"
    />
    <div class="text-sm text-slate-500">
      * Click on the image to change it
    </div>
  </div>

  <div class="flex justify-end">
    <action-button
        color="blue"
        :disabled="!selectedFile"
        @click="$emit('nextStep')"
    >
      Next
    </action-button>
  </div>
</template>

<style scoped>

</style>