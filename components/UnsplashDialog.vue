<template>
  <Dialog :is-show-dialog="isShow">
    <template #body>
      <div class="h-[517px]">
        <h2 class=" font-bold mb-5 text-xm">Upload Image</h2>
        <SearchInput v-model="query" @change="requestPhotosByQuery"/>
        <div v-if="hasError" class="w-full h-full text-ml content-center">
          <p class="text-center">
            {{ errorMessage }}
          </p>
        </div>
        <div
v-else class="h-[370px] images-box w-full mt-5 overflow-y-scroll grid gap-1 grid-cols-1
            justify-items-center justify-center sm:grid-cols-3 lg:grid-cols-3 min-[425px]:grid-cols-2"
             @click="selectPhoto">
          <NuxtImg
              v-for="photo in unsplash.photos" :key="photo" :src="photo" class="sm:w-[165px] sm:h-[100px] photo cursor-pointer"
              fit="con"/>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup>

import Dialog from "~/components/Base/Dialog.vue";
import {isBoolean} from "~/utils/validation/validators.js";
import {useUnsplashStore} from "~/stores/unsplash.js";
import SearchInput from "~/components/Base/SearchInput.vue";

defineProps({
  isShow: {
    type: Boolean,
    required: true,
    validator: isBoolean
  }
})

const emits = defineEmits(['selectedImg'])
const query = ref('');
const errorMessage = ref('');

const unsplash = useUnsplashStore();
onMounted(async () => {
  try {
    await unsplash.fetchPhotos();
  } catch (error) {
    console.log(error)
    errorMessage.value = error.message
  }
})

const selectPhoto = (event) => {
  if (event.target instanceof HTMLImageElement) {
    emits('selectedImg', event.target.src);
  }
}

const requestPhotosByQuery = async () => {
  try {
    await unsplash.fetchPhotos(query.value);
  } catch (error) {
    console.log(error)
    errorMessage.value = error.message;
  }
}

const hasError = computed(() => {
  return unsplash.hasError;
})

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