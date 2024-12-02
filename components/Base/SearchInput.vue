<template>
  <TextInput
id="query"
             v-model="model"
             name="query"
             type="text"
             placeholder="Search..."
             custom-classes="rounded-xl"
             @change="emits('change')"
             />
</template>

<script setup>

import TextInput from "~/components/Base/TextInput.vue";

const emits = defineEmits(['change']);
const model = defineModel('');

</script>