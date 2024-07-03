<template>
  <div class="w-[329px] h-[59px] bg-primary-200 flex items-center justify-around rounded-full">
      <label :class="[{'bg-secondary-900': isCurrent(valueFirstRadio)}, labelClass]"
             for="login">{{textFirstRadio}}</label>
      <label :class="[{'bg-secondary-900': isCurrent(valueSecondRadio)}, labelClass]"
             for="registration">{{textSecondRadio}}</label>
    <input @input="$emit('update:modelValue', $event.target.value)" class="hidden" type="radio" name="radio" id="login" :value="valueFirstRadio" />
    <input @input="$emit('update:modelValue', $event.target.value)" class="hidden" type="radio" name="radio" id="registration" :value="valueSecondRadio" />
  </div>
</template>

<script setup>
import { isNotEmptyString } from "~/utils/validation/validators.js";

const props = defineProps({
    textFirstRadio: {
      type: String,
      required: true,
      validator: isNotEmptyString
    },
    textSecondRadio: {
      type: String,
      required: true,
      validator: isNotEmptyString
    },
    valueFirstRadio: {
      type: String,
      required: true,
      validator: isNotEmptyString
    },
    valueSecondRadio: {
      type: String,
      required: true,
      validator: isNotEmptyString
    },
    modelValue: {
        type: String,
    }
})

defineEmits(['update:modelValue']);


const labelClass = `w-[146px] h-[40px] flex items-center justify-center rounded-full text-center text-white
 bg-secondary-600 cursor-pointer transition duration-500 delay-300 hover:bg-secondary-800`;

const isCurrent = computed(() => {
  return (value) => {
    return props.modelValue === value
  }
})

</script>
