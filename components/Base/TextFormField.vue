<template>
  <BaseFormField :text-label="textLabel" :name-input="nameInput" :error="error ? error : {}">
    <TextInput v-model="value" :type="type" :id="nameInput" :placeholder="placeholder" :name="nameInput"
               @input="$emit('update:modelValue', $event.target.value)"/>
  </BaseFormField>
</template>

<script setup>
import TextInput from "~/components/Base/TextInput.vue";
import {isNotEmptyString, isString} from "~/utils/validation/validators.js";

defineProps({
  textLabel: {
    type: String,
    required: true,
    validator: isNotEmptyString
  },
  type: {
    type: String,
    required: true,
    validator(value) {
      return value === 'text' || value === 'email';
    }
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