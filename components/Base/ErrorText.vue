<template>
  <span v-show="isShow" :class="errorClass"> {{ text }} </span>
</template>

<script setup>

import {isBoolean, isString} from "~/utils/validation/validators.js";

const props = defineProps({
  text: {
    type: String,
    default: '',
    validator: isString
  },
  isShow: {
    type: Boolean,
    default: false,
    validator: isBoolean
  },
  customClasses: {
    type: String,
    required: false,
    default: '',
  }
})

const errorClass = `text-sm text-error mt-2 relative`;

const btnClasses = computed(() => {
  return  [
    btnClasses,
    props.customClasses
  ].join(' ');
})

</script>