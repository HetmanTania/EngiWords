<template>
  <div ref="refReviewBlock" @mouseover="mouseOverAnimation" @mouseout="mouseOutAnimation"
       class="relative preview-box cursor-pointer shadow-box
          md:w-[375px] w-[305px] h-[330px] p-2 bg-white rounded-xl">
    <div  class="h-2/3">
      <NuxtImg class="rounded-xl mx-auto object-cover w-full h-full"  :src="wordList.pathToImg"></NuxtImg>
    </div>
    <div class="h-1/3 pt-2.5 flex flex-col justify-between">
      <p class="text-base font-semibold">{{ wordList.name }}</p>
      <div class="flex items-start justify-between">
        <p class="text-xm font-light">30 words</p>
        <div>
          <button class="cursor-pointer" ref="refEdit"
                  @click="editWordList"
                  @mouseover="btnOverAnimation(refEdit)"
                  @mouseout="btnOutAnimation(refEdit)">
            <EditIcon class="cursor-pointer" style="font-size: 32px"></EditIcon>
          </button>
          <button class="cursor-pointer" ref="refTrash"
                  @click="deleteWordList"
                  @mouseover="btnOverAnimation(refTrash)"
                  @mouseout="btnOutAnimation(refTrash)">
            <TrashIcon style="font-size: 32px"></TrashIcon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import EditIcon from "~/components/Icons/EditIcon.vue";
import TrashIcon from "~/components/Icons/TrashIcon.vue";

import gsap from "~/gsap.js";

import { isWordList } from "~/utils/validation/validators.js";



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

const mouseOverAnimation = () => {
  const tl = gsap.timeline();
  tl.to(refReviewBlock.value, {
    y: '-10px',
    duration: 0.2,
    ease: 'power1.inOut',
  });
}

const mouseOutAnimation = () => {
  const tl = gsap.timeline();
  tl.to(refReviewBlock.value, {
    y: '0',
    duration: 0.2,
    ease: 'power1.inOut',
  });
}

const btnOverAnimation = (ref) => {
  const tl = gsap.timeline();
  tl.to(ref, {
    y: '-5px',
    duration: 0.2,
    ease: 'power1.inOut',
  });
}

const btnOutAnimation = (ref) => {
  const tl = gsap.timeline();
  tl.to(ref, {
    y: '0',
    duration: 0.2,
    ease: 'power1.inOut',
  });
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