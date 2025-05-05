<script setup lang="ts">
import {computed, ref} from 'vue'
import ImageUploader from "~/components/ImageUploader.vue";
import FormStepper from "~/components/FormStepper.vue";
import StyleSelection from "~/components/StyleSelection.vue";
import ConstraintsSelection from "~/components/ConstraintsSelection.vue";
import RequestResume from "~/components/RequestResume.vue";
import {Steps} from "~/enums/steps.enum";

const step = ref<Steps>(Steps.photo)
const availableSteps = ref<Steps[]>([Steps.photo])
const selectedFile = ref<File | null>(null)
const style = ref('')
const constraints = ref('')
const generatedImage = ref<string | null>(null)
const isLoading = ref(false)

const nextStep = () => {
  if (step.value < Steps.result) {
    step.value++;
    availableSteps.value.push(step.value)
  }
}

const previewUrl = computed(() => selectedFile.value ? URL.createObjectURL(selectedFile.value) : null)

const startProcess = async () => {
  if (!selectedFile.value || !style.value) {
    return
  }
  isLoading.value = true
  nextStep();
  const formData = new FormData()
  formData.append('image', selectedFile.value)
  formData.append('style', style.value)
  formData.append('constraints', constraints.value)

  const response = await fetch('/api/generate-image', {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()
  generatedImage.value = `data:image/png;base64,${data.imageBase64}`
  isLoading.value = false
}
</script>

<template>
  <div class="w-5/6 xl:w-2/4 mx-auto py-10 flex flex-col gap-8">
    <header class="text-center text-balance flex flex-col gap-4">
      <h1 class="text-4xl text-slate-800 font-bold">
        Upload your room, get instant design inspiration.
      </h1>
      <span class="text-xl text-slate-600">No signup needed. First upload for free.</span>
    </header>

    <FormStepper
        :step="step"
        :available-steps="availableSteps"
        @setStep="(newStep: number) => step = newStep"
    />

    <ImageUploader
        v-if="step === Steps.photo"
        :selected-file="selectedFile"
        :preview-url="previewUrl"
        @setSelectedFile="(file: File) => selectedFile = file"
        @nextStep="nextStep"
    />

    <StyleSelection
        v-if="step === Steps.style"
        v-model="style"
        @nextStep="nextStep"
    />

    <ConstraintsSelection
        v-if="step === Steps.constraints"
        v-model="constraints"
        @nextStep="nextStep"
    />

    <RequestResume
        v-if="step === Steps.resume"
        :style="style"
        :previewUrl="previewUrl"
        :isLoading="isLoading"
        @startProcess="startProcess"
    />

    <div v-if="step === Steps.result" class="w-full flex justify-center mt-6 relative">
      <img
          v-if="previewUrl && !generatedImage"
          :src="previewUrl"
          alt="Uploaded image"
          class="w-full rounded-xl shadow-lg transition duration-300"
          style="filter: blur(8px);"
      />

      <div v-if="isLoading" class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-50 rounded-xl">
        <div class="w-16 h-16 border-4 border-t-4 border-gray-600 border-solid rounded-full animate-spin"></div>
      </div>

      <img
          v-if="generatedImage && !isLoading"
          :src="generatedImage"
          alt="Generated design"
          class="w-full rounded-xl shadow-lg"
      />
    </div>
  </div>
</template>
