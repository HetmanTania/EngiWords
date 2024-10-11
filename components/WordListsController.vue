<template>
  <div
      class="grid-cols-1 gap-4 mt-4 grid justify-items-center sm:justify-between
      xl:grid-cols-[375px_minmax(0,375px)_375px] md:grid-cols-[minmax(0,375px)_375px] sm:grid-cols-[minmax(0,305px)_305px]">
    <WordListBlock
                    v-for="wordList in wordListsStore.wordLists" :key="wordList.id"
                   :word-list="wordList"
                   @delete-word-list="setAction(OPERATION_WITH_DATA.remove, wordList)"
                   @edit-word-list="setAction(OPERATION_WITH_DATA.edit, wordList)"/>
  </div>
  <WordListDialog
                  v-if="isWordListDialogOpen" :word-list="CRUDwordList" :action="CRUDAction"
                   @create="createNewWordList" @edit="editWordList" @remove="deleteWordList"
                   @close="closeWordListDialog"/>
</template>

<script setup>

import { isBoolean } from "~/utils/validation/validators.js";
import { OPERATION_WITH_DATA } from "~/utils/constants.js";

import WordListBlock from "~/components/WordListBlock.vue";
import WordListDialog from "~/components/WordListDialog.vue"

const wordListsStore = useWordListsStore();

const props = defineProps({
  isShowDialog: {
    type: Boolean,
    required: true,
    validator: isBoolean
  },
})

const emits = defineEmits(['editWordList', 'closeCrateWordListDialog'])

const CRUDAction = ref('');
const CRUDwordList = ref({});

const isWordListDialogOpen = ref(props.isShowDialog);

onMounted(async () => {
  await wordListsStore.requestWordLists();
})

const setAction = (action, wordList) => {
  CRUDAction.value = action;
  CRUDwordList.value = {...wordList}
  isWordListDialogOpen.value = true;
}

const createNewWordList = (wordList) => {
  wordListsStore.createWordList(wordList);
}

const deleteWordList = async (wordList) => {
  await wordListsStore.deleteWordListRequest(wordList.$id);
}

const editWordList = async (wordList) => {
  await wordListsStore.editWordListRequest(wordList.$id, wordList);
}

const closeWordListDialog = () => {
  isWordListDialogOpen.value = false;
  emits('closeCrateWordListDialog');
}

watch(() => props.isShowDialog, (newValue) => {
  if(newValue) {
    setAction(OPERATION_WITH_DATA.create, {});
  }
  isWordListDialogOpen.value = newValue;
})

onUnmounted(() => {
  wordListsStore.destroyWordList();
})

</script>