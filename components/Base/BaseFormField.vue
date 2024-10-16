<template>
 <div class="flex flex-col items-start justify-between w-full mt-5">
   <BaseLabel :text="textLabel" :name-input="nameInput"/>
   <slot></slot>
   <ErrorText :is-show="error?.isShowErrorText" :text="error?.textError" />
 </div>
</template>

<script setup>
import {isNotEmptyString} from "~/utils/validation/validators.js";
import BaseLabel from "~/components/Base/BaseLabel.vue";
import ErrorText from "~/components/Base/ErrorText.vue";

defineProps({
  textLabel: {
    type: String,
    required: true,
    validator: isNotEmptyString
  },
  nameInput: {
    type: String,
    required: true,
    validator: isNotEmptyString
  },
  error: {
    type: Object,
    required: false
  },
})

</script>