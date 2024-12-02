<template>
  <BaseFormField :error="error ? error : {}" :label="label" :name="name">
    <PasswordInput  :id="name" v-model="value" :name="name" :placeholder="placeholder"
                    @input="$emit('update:modelValue', $event.target.value)"/>
  </BaseFormField>
</template>

<script setup>
import PasswordInput from "~/components/Base/PasswordInput.vue";
import {isNotEmptyString, isString} from "~/utils/validation/validators.js";

defineProps({
  label: {
    type: String,
    required: true,
    validator: isNotEmptyString
  },
  name: {
    type: String,
    required: true,
    validator: isNotEmptyString
  },
  error: {
    type: Object,
    required: false,
  },
  placeholder: {
    type: String,
    required: true,
    validator: isString,
  },
})

const value = ref('');
defineEmits(["update:modelValue"]);

</script>