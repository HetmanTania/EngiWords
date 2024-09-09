<template>
  <input
      :id="id"
      :type="type"
      :name="name"
      :class="inputClasses"
      :placeholder="placeholder"
      v-model.trim="value"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="$emit('change', $event.target.value)"
  >
</template>

<script setup>

import {isString} from "~/utils/validation/validators.js";

const { id, name, customClasses, placeholder, modelValue } = defineProps({
  id: {
    type: String,
    required: true,
    validator: isString
  },
  type: {
    type: String,
    required: true,
    validator(value) {
      return value === 'text' || value === 'email';
    }
  },
  name: {
    type: String,
    required: true,
    validator: isString
  },
  placeholder: {
    type: String,
    required: true,
    validator: isString
  },
  modelValue: {
    type: String,
    required: true,
    validator: isString,
  },
  customClasses: {
    type: String,
    validator: isString,
    default: '',
  }
})

defineEmits(['update:modelValue', 'change']);
const value = ref('');


const baseInputClasses = `sm:text-sm sm:leading-6 block border-2 rounded-full border-primary px-[20px] py-[10px] w-full
        bg-transparent outline-none placeholder:text-text-600`;
const focusInputClasses = `focus:border-primary-500 transition duration-500 focus:ring-0`;


const inputClasses = computed(() => {
  return  [
    baseInputClasses,
    focusInputClasses,
    customClasses
  ].join(' ');
})
</script>