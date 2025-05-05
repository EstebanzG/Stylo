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
      class="h-[300px] w-full bg-white border-4 border-lightBlue rounded-xl flex flex-col justify-center items-center gap-5 cursor-pointer shadow"
      @click="fileInputRef?.click()"
  >
    <upload-icon/>
    <span class="text-xl text-slate-600 text-center">Click to upload your image</span>
  </div>

  <div v-if="selectedFile" class="flex flex-col gap-4">
    <img
        v-if="previewUrl"
        :src="previewUrl" alt="Preview"
        class="rounded-xl w-full max-h-[300px] object-contain"
    />
    <action-button @click="fileInputRef?.click()">
      Change image
    </action-button>
  </div>

  <div class="flex justify-end">
    <button
        class="px-4 py-2 bg-blue-500 text-white rounded-xl"
        :disabled="!selectedFile"
        @click="$emit('nextStep')"
    >
      Next
    </button>
  </div>
</template>

<style scoped>

</style>