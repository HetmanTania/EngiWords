<template>
  <div class="flex flex-col items-start justify-between w-full mt-5">
    <BaseLabel :name="name" :text="label" />
    <slot />
    <ErrorText :is-show="error?.isShowErrorText" :text="error?.textError" />
  </div>
</template>

<script setup>
import BaseLabel from "~/components/Base/BaseLabel.vue";
import ErrorText from "~/components/Base/ErrorText.vue";
import { isNotEmptyString } from "~/utils/validation/validators.js";

defineProps({
  label: {
    type: String,
    required: true,
    validator: isNotEmptyString,
  },
  name: {
    type: String,
    required: true,
    validator: isNotEmptyString,
  },
  error: {
    type: Object,
    required: false,
  },
});
</script>
