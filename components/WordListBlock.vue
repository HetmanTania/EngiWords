<template>
  <div
      ref="refReviewBlock" class="relative preview-box cursor-pointer shadow-box
      md:w-[375px] w-[305px] h-[330px] p-2 bg-white rounded-xl" @mouseout="mouseOutAnimation(refReviewBlock)"
      @mouseover="mouseOverAnimation(refReviewBlock)">
    <div class="h-2/3">
      <NuxtImg :src="wordList.pathToImg" class="rounded-xl mx-auto object-cover w-full h-full"/>
    </div>
    <div class="h-1/3 pt-2.5 flex flex-col justify-between">
      <p class="text-base font-semibold">{{ wordList.name }}</p>
      <div class="flex items-start justify-between">
        <p class="text-xm font-light">30 words</p>
        <div>
          <button
              ref="refEdit" class="cursor-pointer"
              @click="editWordList"
              @mouseout="btnOutAnimation(refEdit)"
              @mouseover="btnOverAnimation(refEdit)">
            <EditIcon class="cursor-pointer" style="font-size: 32px"/>
          </button>
          <button
              ref="refTrash" class="cursor-pointer"
              @click="deleteWordList"
              @mouseout="btnOutAnimation(refTrash)"
              @mouseover="btnOverAnimation(refTrash)">
            <TrashIcon style="font-size: 32px"/>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import EditIcon from "~/components/Icons/EditIcon.vue";
import TrashIcon from "~/components/Icons/TrashIcon.vue";
import {
  mouseOutAnimation,
  mouseOverAnimation,
  btnOutAnimation,
  btnOverAnimation
} from "~/animations/wordListBlockAnimation.js";

import {isWordList} from "~/utils/validation/validators.js";

const props = defineProps({
  wordList: {
    type: Object,
    required: true,
    validator: isWordList
  }
})

const emits = defineEmits(['deleteWordList', 'editWordList']);

const refReviewBlock = ref(null);
const refTrash = ref(null);
const refEdit = ref(null);

const editWordList = () => {
  emits('editWordList', props.wordList)
}

const deleteWordList = () => {
  emits('deleteWordList', props.wordList)
}


</script>

<style>
.bg {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
}
</style>