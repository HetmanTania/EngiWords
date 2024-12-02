<template>
  <BaseFormField :error="error ? error : {}" :label="label" :name="name">
    <TextInput
:id="name" v-model="value" :name="name" :placeholder="placeholder" :type="type"
               @input="$emit('update:modelValue', $event.target.value)"/>
  </BaseFormField>
</template>

<script setup>
import TextInput from "~/components/Base/TextInput.vue";
import {isNotEmptyString, isString} from "~/utils/validation/validators.js";

defineProps({
  label: {
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