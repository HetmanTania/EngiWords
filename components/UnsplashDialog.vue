<template>
  <Dialog :is-show-dialog="isShow">
    <template #body>
      <div class="h-[517px]">
        <h2 class=" font-bold mb-5 text-xm">Upload Image</h2>
        <TextInput @change="searchByQuery" id="query" v-model="query"
                   placeholder="Search..." name="query" type="text"
                   custom-classes="rounded-xl"/>
        <div
          class="h-[370px] images-box w-full mt-5 overflow-y-scroll grid gap-1 grid-cols-1
            justify-items-center justify-center sm:grid-cols-3 lg:grid-cols-3 min-[425px]:grid-cols-2" @click="selectPhoto">
          <NuxtImg
                  v-for="photo in photos" :key="photo" fit="con" :src="photo"
                  class="sm:w-[165px] sm:h-[100px] photo"/>
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
import TextInput from "~/components/Base/TextInput.vue";

const emits = defineEmits(['selectedImg'])

defineProps({
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

onMounted(async () => {
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