<template>
  <section class="pl-[10px] pr-[10px] bg-primary-200 pt-[70px] pb-[70px] flex align-top justify-start">
    <div class="w-full h-full container mx-auto">
      <div
        class="max-[400px]:flex-col max-[400px]:items-stretch
        mb-5 flex items-center justify-between">
        <div class="flex items-center justify-center">
          <StarIcon style="font-size: 32px"/>
          <h4 class="text-xm ml-1 sm:text-base">Created by me:</h4>
        </div>
        <button
                class=" max-[400px]:mt-5 sm:p-2 sm:text-xm  p-1.5 rounded-xl border-2 border-primary bg-primary-200  text-primary font-semibold
                hover:bg-primary hover:text-primary-200 transition-all ease-in-out
                active:bg-accent active:border-accent"
                @click="openCreateWordListDialog">Create a new word list</button>
      </div>
      <WordListsController :is-show-dialog="isShowDialogOpen" @close-crate-word-list-dialog="closeCrateWordListDialog"/>
    </div>
  </section>

</template>

<script setup>
import StarIcon from "~/components/Icons/StarIcon.vue";

const isShowDialogOpen = ref(false);

const openCreateWordListDialog = () => {
  isShowDialogOpen.value = true;
}
const closeCrateWordListDialog = () => {
  isShowDialogOpen.value = false;
}

</script>