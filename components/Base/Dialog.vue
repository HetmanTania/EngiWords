<template>
  <div class="fixed overflow-hidden z-1 top-0 left-0 w-full h-full flex items-center justify-center">
    <div
        class="w-screen h-screen bg-text-300 absolute top-0 left-0 z-1 flex items-center justify-center"
        @click="close"/>
    <div class="w-4/5 md:w-2/3 lg:w-1/2 h-fit bg-white rounded-lg shadow-lg overflow-hidden p-7 relative z-2">
      <button class="w-[34px] h-[34px] absolute right-0 top-0" @click="close">
        <Icon style="font-size: 34px" icon="material-symbols-light:close-rounded"/>
      </button>
      <slot name="body"/>
      <slot name="footer">
        <button @click="close"
              class="w-1/3 p-2 rounded-xl border-2 border-primary bg-transparent text-xm text-primary font-semibold
              hover:bg-primary-800 hover:text-white transition-all ease-in-out
              active:bg-primary">Close</button>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

const emit = defineEmits(['close']);

function close() {
  emit('close');
}




</script>