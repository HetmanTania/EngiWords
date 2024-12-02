<template>
  <div class="relative w-full flex items-center justify-between">
    <input
      :id="id"
      v-model.trim="value"
      :class="inputClasses"
      :name="name"
      :placeholder="placeholder"
      :type="isPasswordVisible ? 'text' : 'password'"
      @change="$emit('change', $event.target.value)"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <button
      aria-label="Toggle password visibility"
      class="right-[30px] mr-[15px] top-[8px] absolute"
      @click="isPasswordVisible = !isPasswordVisible"
    >
      <CloseEyeIcon class="absolute" style="font-size: 28px" />
      <OpenEyeIcon class="absolute" style="font-size: 28px" />
    </button>
  </div>
</template>

<script setup>
import CloseEyeIcon from "~/components/Icons/CloseEyeIcon.vue";
import OpenEyeIcon from "~/components/Icons/OpenEyeIcon.vue";
import {
  animOpeningEye,
  animClosingEye,
} from "~/animations/passwordInputAnimation.js";

import { isString } from "~/utils/validation/validators.js";

const props = defineProps({
  id: {
    type: String,
    required: true,
    validator: isString,
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
  modelValue: {
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

const baseInputClasses = `block border-2 rounded-full border-primary w-full px-[20px] py-[10px] bg-transparent
  outline-none transition duration-500 placeholder:text-text-600`;
const focusInputClasses = ` focus:border-primary-500 focus:ring-0 sm:text-sm sm:leading-6`;

defineEmits(["update:modelValue", "change"]);
const value = ref("");
const isPasswordVisible = ref(false);

const inputClasses = computed(() => {
  return [baseInputClasses, focusInputClasses, props.customClasses].join(" ");
});

onMounted(() => {
  animClosingEye();
});

watch(isPasswordVisible, (newValue) => {
  if (newValue) {
    animOpeningEye();
  } else {
    animClosingEye();
  }
});
</script>
