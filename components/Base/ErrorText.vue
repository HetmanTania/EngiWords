<template>
  <span v-show="isShow" :class="['errorText', errorClass]"> {{ text }} </span>
</template>

<script setup>
import gsap from "~/gsap.js";
import {isBoolean, isString} from "~/utils/validation/validators.js";

const props = defineProps({
  text: {
    type: String,
    default: '',
    validator: isString
  },
  isShow: {
    type: Boolean,
    default: false,
    validator: isBoolean
  },
  customClasses: {
    type: String,
    default: '',
  }
})

const errorClass = `text-sm text-error mt-2 relative`;

const btnClasses = computed(() => {
  return  [
    btnClasses,
    props.customClasses
  ].join(' ');
})

watch(() => props.isShow, (newValue) => {
  if(newValue) {
    startShowAnimation();
  }
})

const startShowAnimation = () => {
  const tl = gsap.timeline();
  tl.to('.errorText', {
    y: 5,
    repeat: 3,
    yoyo: true,
    duration: 0.5,
    ease: 'power1.inOut',
  })
}


</script>