<template>
  <label :class="labelClass" :for="nameInput">{{text}}</label>
</template>

<script setup>
import {isNotEmptyString} from "~/utils/validation/validators.js";

const labelClass = `block text-xm font-medium leading-6 mb-3`;

defineProps({
  nameInput: {
    type: String,
    required: true,
    validator: isNotEmptyString
  },
  text: {
    type: String,
    required: true,
    validator: isNotEmptyString
  }
})


</script>