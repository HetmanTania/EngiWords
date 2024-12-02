<template>
  <button
    :aria-busy="isLoading"
    :aria-label="text"
    :class="btnClasses"
    :disabled="isDisabled"
    type="submit"
    @click="clickHandler"
  >
    <span v-if="!isLoading" class="h-[27px]">{{ text }}</span>

    <span v-else class="flex items-center justify-around w-[76.84px] h-[27px]">
      <i :class="[classesPointer, `animate-scalePoint200ms`]" />
      <i :class="[classesPointer, `animate-scalePoint400ms`]" />
      <i :class="[classesPointer, `animate-scalePoint600ms`]" />
    </span>
  </button>
</template>

<script setup>
import { isBoolean, isNotEmptyString } from "~/utils/validation/validators.js";

const props = defineProps({
  text: {
    type: String,
    required: true,
    validator: isNotEmptyString,
  },
  isDisabled: {
    type: Boolean,
    required: true,
    validator: isBoolean,
  },
  isLoading: {
    type: Boolean,
    validator: isBoolean,
    default: false,
  },
  customClasses: {
    type: String,
    default: "",
  },
});

const baseBtnClasses = `w-[118px] rounded-full bg-primary px-5 py-2 text-xm font-semibold text-white shadow-sm `;
const focusBtnClasses = `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`;
const activeBtnClasses = `transition duration-300 active:shadow-md active:shadow-secondary-600`;
const disabledBtnClasses = `disabled:border-text-200 disabled:bg-text-200`;
const hoverBtnClasses = `hover:bg-accent`;

const classesPointer =
  "w-[18px] h-[18px] bg-white rounded-full fa-solid fa-circle fa-2xs";

const btnClasses = computed(() => {
  return [
    baseBtnClasses,
    activeBtnClasses,
    hoverBtnClasses,
    disabledBtnClasses,
    focusBtnClasses,
    props.customClasses,
  ].join(" ");
});

const emits = defineEmits(["submit"]);
const clickHandler = () => {
  emits("submit");
};
</script>
