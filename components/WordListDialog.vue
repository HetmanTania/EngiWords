<template>
  <Dialog @close="close">
    <template #body>
      <div class="flex flex-col items-start justify-center">
        <h2 class="font-bold mb-5 text-xm">{{ config.title }}</h2>
        <div class="w-full flex flex-col items-start justify-center">
          <NuxtImg
            :src="wordListCRUD.pathToImg"
            class="m-auto h-[250px] cursor-pointer mb-5"
            @click="toggleUnsplashDialog()"
          />
        </div>
        <TextInput
          id="name"
          v-model="wordListCRUD.name"
          :placeholder="config.placeholder"
          custom-classes="rounded-xl"
          name="name"
          type="text"
          @keydown.enter="submitHandle"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex items-center justify-between mt-5">
        <BtnSubmit
          :is-disabled="isSubmitDisabled()"
          :text="config.titleBtn"
          custom-classes="w-1/3 p-2 rounded-xl border-2
          border-secondary bg-secondary hover:bg-secondary-800 hover:text-white transition-all
          ease-in-out active:bg-secondary mt-0"
          @submit="submitHandle"
        />
        <button
          class="w-1/3 p-2 rounded-xl border-2 border-primary bg-transparent text-xm text-primary font-semibold hover:bg-primary-800 hover:text-white transition-all ease-in-out active:bg-primary"
          @click="close"
        >
          Cancel
        </button>
      </div>
    </template>
  </Dialog>
  <UnsplashDialog
    v-if="isUnsplashDialogOpen"
    :is-show="isUnsplashDialogOpen"
    @close="toggleUnsplashDialog()"
    @selected-img="selectImg"
  />
</template>

<script setup>
import Dialog from "~/components/Base/Dialog.vue";
import BtnSubmit from "~/components/Base/BtnSubmit.vue";
import TextInput from "~/components/Base/TextInput.vue";

import {
  isOPERATION_WITH_DATA,
  isValidUrl,
} from "~/utils/validation/validators.js";
import { OPERATION_WITH_DATA } from "~/utils/constants.js";
import { configurationWordList } from "~/errorsAndConfiguration/wordListDialogConfiguration.js";

const emit = defineEmits([
  "close",
  OPERATION_WITH_DATA.create,
  OPERATION_WITH_DATA.edit,
  OPERATION_WITH_DATA.remove,
]);

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
});

const config = configurationWordList[props.action];

const wordListCRUD = ref({});
const isUnsplashDialogOpen = ref(false);

onMounted(() => {
  if (props.action !== OPERATION_WITH_DATA.create) {
    initializeWordListFromProps();
  } else {
    initializeEmptyWordList();
  }
});

const initializeEmptyWordList = () => {
  wordListCRUD.value = {
    name: "",
    pathToImg: "../public/img/placeholder.webp",
  };
};

const initializeWordListFromProps = () => {
  wordListCRUD.value = { ...props.wordList };
};

const isSubmitDisabled = () => {
  return config.isSubmitDisabled({
    title: wordListCRUD.value.name,
    editWordList: { ...wordListCRUD.value },
    propsWordList: props.wordList,
  });
};

const isInputDisabled = computed(() => {
  return props.action === OPERATION_WITH_DATA.remove;
});

const selectImg = (url) => {
  if (isValidUrl(url)) {
    wordListCRUD.value.pathToImg = url;
  }
  toggleUnsplashDialog();
};

const submitHandle = () => {
  emit(props.action, { ...wordListCRUD.value });
  close();
};

const close = () => {
  emit("close");
};

const toggleUnsplashDialog = () => {
  isUnsplashDialogOpen.value = !isUnsplashDialogOpen.value;
};
</script>
