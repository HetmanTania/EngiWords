<template>
  <TheHeader/>
  <main class=" w-full h-full ">
    <div class="w-full container mx-auto">
      <h2 class="pl-[10px] pr-[10px] text-4xl pt-[40px]">My Word Lists</h2>
    </div>
    <WordListsController/>
    <button @click="logout">logout</button>
  </main>
</template>

<script setup>

import WordListsController from "~/components/WordLists.vue";
import TheHeader from "~/components/TheHeader.vue";

definePageMeta({
  layout: 'home'
})

const authStore = useAuthStore();

const logout = () => {
  authStore.logout()
}

</script>