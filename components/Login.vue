<template>
  <div>
    <form class="from-animation flex flex-col items-end justify-between" action="" @submit.prevent>
      <div class="flex flex-col items-start justify-between w-full">
        <BaseLabel text="Email address" nameInput="email"/>
        <TextInput v-model="email" type="email" id="email" name="email" placeholder="Enter email"/>
      </div>
      <div class="flex flex-col items-start justify-between w-full mt-5">
        <BaseLabel text="Password" nameInput="password"/>
        <input id="password" v-model="password"
               :class="inputClass" type="password" name="password" placeholder="Enter password">
      </div>
      <ErrorText :is-show="errorServer.isError" :text="errorServer.text"/>
      <BaseBtnSubmit  @submit="handlerLogin"
                      text="Login" :is-loading="isLoading"
                      :is-disabled="isSubmitDisabled" custom-classes="mt-4"/>
    </form>
  </div>
</template>

<script setup>
import {useAuthStore} from "~/stores/auth.js";

import { errorMessageFromServer } from "~/form/RegisterAndLoginErrors.js";
import useErrorServerHandler from "~/composable/useErrorServerHandler.js";
import { isNotEmptyString } from '~/utils/validation/validators.js';

import ErrorText from "~/components/Base/ErrorText.vue";
import TextInput from "~/components/Base/TextInput.vue";
import BaseLabel from "~/components/Base/BaseLabel.vue";

import gsap from "~/gsap.js";

definePageMeta({
  layout: 'auth'
})

const inputClass = `block border-2 rounded-full border-primary px-[20px] py-[10px] w-full
        bg-transparent placeholder:text-text-600 outline-none focus:border-primary-500 transition duration-500
        focus:ring-0 sm:text-sm sm:leading-6`;


const email = ref('');
const password = ref('');

const isLoading = ref(false);

const errorServerHandler = useErrorServerHandler(errorMessageFromServer, {
  email: email,
  password: password,
});
const errorServer = ref(errorServerHandler.error);

const authStore = useAuthStore();

const isSubmitDisabled = computed(() => {
  return errorServerHandler.isHaveError.value || !isNotEmptyString(email.value) || !isNotEmptyString(password.value);
})

onMounted(() => {
  startFormInputsAnimation();
})

const handlerLogin = async () => {
  try {
    isLoading.value = true;
    await authStore.login({
      email: email.value,
      password: password.value,
    });
  } catch (e) {
    errorServerHandler.checkServerErrors(e.type);
  }
  finally {
    isLoading.value = false;
  }
}


const startFormInputsAnimation = () => {
  const tl = gsap.timeline();
  tl.to('input', {
    scale: 1.1,
    duration: .3,
    delay: 2,
    stagger: .1,
  }).to('input',{
    scale: 1,
    delay: .1,
    stagger: .1,
  });
}
</script>