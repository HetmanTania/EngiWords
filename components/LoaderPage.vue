<template>
 <div class="w-full h-screen flex justify-center items-center">
   <NuxtImg class="w-[200px] h-[200px]" src="../public/svg/loader.svg"/>
 </div>
</template>

<script setup>
  onMounted(() => {
    console.log('onMounted loader')
  })
</script>