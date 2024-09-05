<template>
  <div class="h-full w-full flex flex-row justify-around items-center">
    <div class="basis-1/3 mr-6">
      <NuxtImg class="img-animation w-full" src="../public/img/studying_girl.png" />
    </div>
    <div class="formPart flex flex-col w-[500px] min-h-[455px] justify-start ">
      <div class="flex flex-col items-center mb-10">
        <h3 class="text-sm mb-5">Welcome to EngiWords..!</h3>
        <DoubleRadioBtn :modelValue="action"
                        @update:modelValue="$event => (action = $event)"
                        :text-first-radio="LOGIN_OR_REGISTER.login.text"
                        :value-first-radio="LOGIN_OR_REGISTER.login.value"
                        :text-second-radio="LOGIN_OR_REGISTER.register.text"
                        :value-second-radio="LOGIN_OR_REGISTER.register.value"/>
      </div>
      <Register v-if="action === LOGIN_OR_REGISTER.register.value"/>
      <Login v-else/>
    </div>
  </div>
</template>

<script setup>
import gsap from "~/gsap.js";
import {LOGIN_OR_REGISTER} from "~/utils/constants.js";
import {useAuthStore} from "~/stores/auth.js";

definePageMeta({
  layout: 'auth'
})
const action = ref(LOGIN_OR_REGISTER.register.value);

onMounted(() => {
  startImgAnimation();
  startAnimation();
})

const startImgAnimation = () => {
  const tl = gsap.timeline();

  tl.fromTo('.img-animation', {
    opacity: 0,
  },{
    opacity: 1,
    scale: 1.2,
    duration: 1,
  }).to('.img-animation', {
    scale: 1,
  })
}

const startAnimation = () => {
  const tl = gsap.timeline();

  tl.fromTo('.formPart', {
    opacity: 0,
    y: '-100vh'
  }, {
    opacity: 1,
    y: '0px',
    duration: `1.5`,
    delay: 1,
  })
}



</script>
