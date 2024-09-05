<template>
  <Dialog :isShowDialog="isShow">
    <template v-slot:body>
      <div class="h-[517px]">
        <h2 class=" font-bold mb-5 text-xm">Upload Image</h2>
        <input @change="searchByQuery" v-model="query" placeholder="Search..." type="text" class=" mt-5 block border-2 rounded-xl border-primary px-[20px] py-[10px]
        w-full bg-transparent placeholder:text-text-600 outline-none focus:border-primary-500 transition duration-500
        focus:ring-0 sm:text-sm sm:leading-6 disabled:border-text-200 disabled:text-text-700"/>
        <div @click="selectPhoto" class="h-[370px] images-box w-full mt-5 overflow-y-scroll grid gap-1 grid-cols-1
            justify-items-center justify-center sm:grid-cols-3 lg:grid-cols-3 min-[425px]:grid-cols-2">
          <NuxtImg fit="con" :key="photo" v-for="photo in photos" :src="photo"
                  class="sm:w-[165px] sm:h-[100px] photo"></NuxtImg>
          <div v-if="isWasFirstSearch && !photos.length" class="text-ml self-start">
            Nothing found for your request, please enter another request
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup>

import Dialog from "~/components/Base/Dialog.vue";
import { isBoolean } from "~/utils/validation/validators.js";
import {getRandomPhotos, searchPhotosByQuery} from "~/unsplash.js";

const emits = defineEmits(['selectedImg'])

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
    validator: isBoolean
  }
})

const query = ref('');
const photos = ref([]);

const isWasFirstSearch = ref(false);

const selectPhoto = (e) => {
  if(e.target instanceof HTMLImageElement) {
    emits('selectedImg', e.target.src);
  }
}

onMounted( async () => {
  await randomPhotos();
})

const searchByQuery = async () => {
  if(query.value.length){
    photos.value = await searchPhotosByQuery(query.value);
  }
  else {
   await randomPhotos();
  }
  isWasFirstSearch.value = true;
}

const randomPhotos = async () => {
  photos.value = await getRandomPhotos();
}



</script>

<style scoped>
.images-box::-webkit-scrollbar {
  display: none;
}
.images-box {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.photo {
  object-fit: cover;
  width: 245px;
  height: 150px;
}
</style>