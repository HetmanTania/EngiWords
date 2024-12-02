<template>
  <span v-show="isShow" ref="errorTextRef" :class="['errorText', errorClasses]">
    {{ text }}
  </span>
</template>

<script setup>
import { isBoolean, isString } from "~/utils/validation/validators.js";
import { startShowAnimation } from "~/animations/errorTextAnimation.js";

const props = defineProps({
  text: {
    type: String,
    default: "",
    validator: isString,
  },
  isShow: {
    type: Boolean,
    default: false,
    validator: isBoolean,
  },
  customClasses: {
    type: String,
    default: "",
  },
});

const baseErrorClass = `text-sm text-error mt-2 relative`;
const errorTextRef = ref(null);

const errorClasses = computed(() => {
  return [baseErrorClass, props.customClasses].join(" ");
});

watch(
  () => props.isShow,
  (newValue) => {
    if (newValue) {
      startShowAnimation(errorTextRef);
    }
  },
);
</script>
