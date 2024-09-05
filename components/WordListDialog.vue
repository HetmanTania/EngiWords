<template>
  <Dialog @close="close">
    <template v-slot:body>
      <div class="flex flex-col items-start justify-center">
        <h2 class=" font-bold mb-5 text-xm">{{ config.title }}</h2>
        <div class="w-full flex flex-col items-start justify-center">
          <NuxtImg class="m-auto h-[250px]" :src="wordListCRUD.pathToImg"></NuxtImg>
          <button @click="toggleUnsplashDialog()" class="mt-5">Upload Photo</button>
        </div>
        <input :disabled="isInputDisabled" @keydown.enter="submitHandle" v-model.trim="wordListCRUD.name"
               placeholder="New set of words" type="text" class=" mt-5 block border-2 rounded-xl border-primary px-[20px] py-[10px]
        w-full bg-transparent placeholder:text-text-600 outline-none focus:border-primary-500 transition duration-500
        focus:ring-0 sm:text-sm sm:leading-6 disabled:border-text-200 disabled:text-text-700"/>
      </div>
    </template>
    <template v-slot:footer>
      <div class="flex items-center justify-between mt-5">
        <BtnSubmit @submit="submitHandle" :isDisabled="isSubmitDisabled()"
                   :text="config.titleBtn" customClasses="w-1/3 p-2 rounded-xl border-2
          border-secondary bg-secondary hover:bg-secondary-800 hover:text-white transition-all
          ease-in-out active:bg-secondary mt-0" >
        </BtnSubmit>
        <button @click="close" class="w-1/3 p-2 rounded-xl border-2 border-primary bg-transparent text-xm text-primary font-semibold
              hover:bg-primary-800 hover:text-white transition-all ease-in-out
              active:bg-primary">Cancel</button>
      </div>
    </template>
  </Dialog>
  <UnsplashDialog v-if="isUnsplashDialogOpen" :isShow="isUnsplashDialogOpen"
                  @selectedImg="selectImg"
                  @close="toggleUnsplashDialog()" ></UnsplashDialog>
</template>

<script setup>

import {isOPERATION_WITH_DATA, isValidUrl} from "~/utils/validation/validators.js";
import { OPERATION_WITH_DATA } from "~/utils/constants.js";
import { configurationWordList } from '~/form/wordListDialogConfiguration.js'

import Dialog from "~/components/Base/Dialog.vue";
import BtnSubmit from "~/components/Base/BtnSubmit.vue";

const emit = defineEmits(['close', OPERATION_WITH_DATA.create,
              OPERATION_WITH_DATA.edit, OPERATION_WITH_DATA.remove]);

const props = defineProps({
  action: {
    type: String,
    required: true,
    validator: isOPERATION_WITH_DATA,
  },
  wordList: {
    type: Object,
    required: true,
  },
})

const config = configurationWordList[props.action];

let wordListCRUD = ref({});
const isUnsplashDialogOpen = ref(false);

onMounted(() => {
  if(props.action !== OPERATION_WITH_DATA.create) {
    initializeWordListFromProps();
  }
  else {
    initializeEmptyWordList();
  }
})

const initializeEmptyWordList = () => {
  wordListCRUD.value = {
    name: '',
    pathToImg: '../public/img/placeholder.webp'
  }
}

const initializeWordListFromProps = (propWordList) => {
  wordListCRUD.value = {...props.wordList};
}

const isSubmitDisabled = () => {
  return config.isSubmitDisabled({title: wordListCRUD.value.name,
    editWordList: {...wordListCRUD.value},
    propsWordList: props.wordList
  });
};

const isInputDisabled = computed(() => {
  return props.action === OPERATION_WITH_DATA.remove;
})

const selectImg = (url) => {
  if(isValidUrl(url)) {
    wordListCRUD.value.pathToImg = url;
  }
  toggleUnsplashDialog();
}

const submitHandle  = () => {
  emit(props.action, {...wordListCRUD.value});
  close();
}

const close = () => {
  emit('close');
}

const toggleUnsplashDialog = () => {
  isUnsplashDialogOpen.value = !isUnsplashDialogOpen.value;
};
</script>
