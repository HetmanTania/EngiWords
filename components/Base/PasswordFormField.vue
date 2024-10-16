<template>
  <BaseFormField :text-label="textLabel" :name-input="nameInput" :error="error ? error : {}">
    <PasswordInput v-model="value" id="nameInput" :placeholder="placeholder" :name="nameInput" :id="nameInput"
                   @input="$emit('update:modelValue', $event.target.value)"/>
  </BaseFormField>
</template>

<script setup>
import PasswordInput from "~/components/Base/PasswordInput.vue";
import {isNotEmptyString, isString} from "~/utils/validation/validators.js";

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