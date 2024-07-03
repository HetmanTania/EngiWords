<template>
  <span v-show="isShow" :class="errorClass"> {{ text }} </span>
</template>

<script setup>

import {isBoolean, isString} from "~/utils/validation/validators.js";

defineProps({
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
})

const errorClass = `text-sm text-error mt-2 relative`;

</script>