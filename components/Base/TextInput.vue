<template>
  <input
    :id="id"
    v-model="model"
    :class="inputClasses"
    :name="name"
    :placeholder="placeholder"
    :type="type"
    @change="emits('change')"
  />
</template>

<script setup>
import { isString } from "~/utils/validation/validators.js";

const props = defineProps({
  id: {
    type: String,
    required: true,
    validator: isString,
  },
  type: {
    type: String,
    required: true,
    validator(value) {
      return value === "text" || value === "email";
    },
  },
  name: {
    type: String,
    required: true,
    validator: isString,
  },
  placeholder: {
    type: String,
    required: true,
    validator: isString,
  },
  customClasses: {
    type: String,
    validator: isString,
    default: "",
  },
});

const emits = defineEmits(["change"]);
const model = defineModel();

const baseInputClasses = `sm:text-sm sm:leading-6 block border-2 rounded-full border-primary px-[20px] py-[10px] w-full
          bg-transparent outline-none placeholder:text-text-600`;
const focusInputClasses = `focus:border-primary-500 transition duration-500 focus:ring-0`;

const inputClasses = computed(() => {
  return [baseInputClasses, focusInputClasses, props.customClasses].join(" ");
});
</script>
