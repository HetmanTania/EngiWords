<template>
  <LoaderPage v-if="uiStore.isPageLoaderShow" />
  <NuxtLayout v-else>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth.js";
import { useUIStore } from "~/stores/uiStore.js";
import { onMounted } from "vue";

const authStore = useAuthStore();
const uiStore = useUIStore();

onMounted(async () => {
  try {
    uiStore.showPageLoader();
    await authStore.initSession();
  } finally {
    uiStore.hiddenPageLoader();
  }
});
</script>
