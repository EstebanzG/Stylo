<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

const fileInput = useTemplateRef<HTMLInputElement>('file-input')
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const isLoading = ref(false)
const generatedImage = ref<string | null>(null)
const style = ref('Modern Minimalist')
const history = ref<{ style: string, imageUrl: string }[]>([])

const styleOptions = [
  'Modern Minimalist',
  'Scandinavian',
  'Japanese Zen',
  'Industrial Loft',
  'Boho Chic',
  'Mid-century Modern',
  'Farmhouse'
]

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

const startProcess = async () => {
  if (!selectedFile.value) return
  isLoading.value = true
  generatedImage.value = null

  const formData = new FormData()
  formData.append('image', selectedFile.value)
  formData.append('style', style.value)

  try {
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    const imageDataUrl = `data:image/png;base64,${data.imageBase64}`
    generatedImage.value = imageDataUrl
    history.value.unshift({ style: style.value, imageUrl: imageDataUrl })
  } catch (e) {
    console.error('Error generating image:', e)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="w-5/6 xl:w-2/4 h-full flex flex-col justify-center items-center gap-10">
    <header class="text-center text-balance flex flex-col gap-4">
      <h1 class="text-4xl text-slate-800 font-bold">Upload your room, get instant design inspiration.</h1>
      <span class="text-xl text-slate-600">No signup needed. First upload for free.</span>
    </header>

    <div
        class="h-[300px] w-full bg-white border-4 border-lightBlue rounded-xl flex flex-col justify-center items-center gap-5 cursor-pointer shadow"
        @click="() => fileInput?.click()"
    >
      <upload-icon />
      <span class="text-xl text-slate-600 text-center text-balance">Drop your image here or click to upload</span>
      <input
          type="file"
          ref="file-input"
          class="hidden"
          accept="image/*"
          @change="onFileChange"
      />
    </div>

    <div class="w-full">
      <label for="style-select" class="text-lg font-medium text-slate-700 mb-2 block">Choose a style</label>
      <select id="style-select" v-model="style" class="w-full p-2 border border-slate-300 rounded-md">
        <option v-for="option in styleOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <action-button is-primary @click="startProcess" :disabled="selectedFile === null || isLoading">
      <template v-if="isLoading">
        <span class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
        Processing...
      </template>
      <template v-else>
        Start process
        <Icon name="heroicons:rocket-launch" size="40px" class="bg-white" />
      </template>
    </action-button>

    <div v-if="generatedImage" class="mt-10 w-full text-center">
      <h2 class="text-xl font-semibold text-slate-700 mb-4">Generated design ({{ style }}):</h2>
      <img :src="generatedImage" alt="Generated interior" class="rounded-xl shadow-lg max-w-full" />
    </div>

    <div v-if="history.length" class="mt-12 w-full">
      <h3 class="text-xl font-semibold text-slate-700 mb-4">History</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="(item, index) in history" :key="index" class="border rounded-lg shadow overflow-hidden">
          <div class="p-2 bg-slate-100 font-medium text-slate-700 text-center">{{ item.style }}</div>
          <img :src="item.imageUrl" class="w-full" alt="History item" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>