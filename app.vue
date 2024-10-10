<template>
  <NuxtLayout>
    <LoaderPage v-if="isLoading"/>
    <NuxtPage v-else/>
  </NuxtLayout>
</template>

<script setup>
const isLoading = ref(true);
onMounted(async () => {
  console.log('start')
  isLoading.value = true;
  const authStore = useAuthStore();
  await authStore.initSession();
  isLoading.value = false
  console.log('end')
})

onUpdated(async () => {
  console.log('start')
  isLoading.value = true;
  const authStore = useAuthStore();
  await authStore.initSession();
  isLoading.value = false
  console.log('end')
})
</script>