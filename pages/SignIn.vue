<template>
  <div class="h-full w-full flex flex-row justify-around items-center">
    <div class="basis-1/3 mr-6">
      <NuxtImg
        class="img-animation w-full"
        src="../public/img/studying_girl.png"
      />
    </div>
    <div class="formPart flex flex-col w-[500px] min-h-[455px] justify-start">
      <div class="flex flex-col items-center mb-10">
        <h3 class="text-sm mb-5">Welcome to EngiWords..!</h3>
        <DoubleRadioBtn
          :model-value="action"
          :text-first-radio="LOGIN_OR_REGISTER.login.text"
          :text-second-radio="LOGIN_OR_REGISTER.register.text"
          :value-first-radio="LOGIN_OR_REGISTER.login.value"
          :value-second-radio="LOGIN_OR_REGISTER.register.value"
          @update:model-value="() => (action = $event)"
        />
      </div>
      <Register v-if="action === LOGIN_OR_REGISTER.register.value" />
      <Login v-else />
    </div>
  </div>
</template>

<script setup>
import { LOGIN_OR_REGISTER } from "~/utils/constants.js";
import {
  startImgAnimation,
  startAnimation,
} from "~/animations/signInAnimation.js";

definePageMeta({
  layout: "auth",
});

const action = ref(LOGIN_OR_REGISTER.register.value);

onMounted(() => {
  startImgAnimation();
  startAnimation();
});
</script>
