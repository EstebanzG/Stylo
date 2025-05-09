<script setup lang="ts">
const constraints = defineModel<string[]>()
const newConstraint = ref<string>('')

const addConstraint = () => {
  if (newConstraint.value.trim()) {
    constraints.value?.push(newConstraint.value.trim())
    newConstraint.value = ''
  }
}

const removeConstraint = (index: number) => {
  constraints.value?.splice(index, 1)
}

defineEmits<{
  nextStep: []
}>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center w-full bg-white rounded-xl focus-within:outline focus-within:outline-2 focus-within:outline-blue-500">
      <input
          v-model="newConstraint"
          type="text"
          placeholder="6-seater sofa"
          class="w-11/12 px-4 py-3 text-lg focus:outline-none rounded-xl"
          @keyup.enter="addConstraint"
      />
      <action-button
        @click="addConstraint"
        color="white"
        class="mr-1"
      >
        <Icon name="heroicons:plus-circle" size="20px"/>
        Add
      </action-button>
    </div>

    <div class="flex justify-end">
      <action-button
          @click="$emit('nextStep')"
          color="blue"
      >
        Start process
      </action-button>
    </div>

    <div v-if="constraints?.length ?? 0 > 0" class="flex flex-wrap gap-2">
      <div
        v-for="(constraint, index) in constraints"
        :key="index"
        class="bg-blue-100 px-3 py-1 rounded-full flex items-center gap-2 border border-blue-500 text-slate-500 select-none"
      >
        {{ constraint }}
        <button
            class="hover:text-blue-600 flex items-center"
            @click="removeConstraint(index)"
        >
          <Icon name="heroicons:x-circle" size="16px"/>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>