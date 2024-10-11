<template>
  <NuxtLayout>
    <LoaderPage v-if="uiStore.isPageLoaderShow"/>
    <NuxtPage v-else/>
  </NuxtLayout>
</template>

<script setup>
import {useUIStore} from "~/stores/uiStore.js";

const uiStore = useUIStore();

onMounted(async () => {
  const authStore = useAuthStore();
  await authStore.initSession();
})

</script>