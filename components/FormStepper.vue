<script setup lang="ts">

import {Steps} from "~/enums/steps.enum";

defineProps<{
  step: Steps
  availableSteps: Steps[]
}>()

defineEmits<{
  setStep: [step: number]
}>()

const stepTitles = ['Photo', 'Style', 'Constraints']
</script>

<template>
  <div class="flex justify-between items-center text-sm text-slate-500">
    <div
        v-for="(title, index) in stepTitles"
        :key="index"
        class="flex-1 text-center"
        :class="{
          'font-semibold text-blue-600': step === index,
          'text-slate-400': step < index,
        }"
    >
      <button
          class="rounded-full w-8 h-8 mx-auto flex items-center justify-center border"
          :class="step >= index ? 'bg-blue-100 border-blue-500' : 'bg-slate-100 border-slate-300'"
          :disabled="!availableSteps.includes(index)"
          @click="$emit('setStep', index)"
      >
        {{ index + 1 }}
      </button>
      <div class="mt-2">{{ title }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>