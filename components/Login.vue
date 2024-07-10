<template>
  <div>
    <form @submit.prevent class="from-animation flex flex-col items-end justify-between" action="">
      <div class="flex flex-col items-start justify-between w-full">
        <label :class="labelClass" for="email">Email address</label>
        <input v-model="email" :class="inputClass"
               type="email" id="email" name="email" placeholder="Enter email" />
      </div>
      <div class="flex flex-col items-start justify-between w-full mt-5">
        <label :class="labelClass" for="email">Password</label>
        <input v-model="password" :class="inputClass"
               type="password" id="password" name="password" placeholder="Enter password" />
      </div>
      <ErrorText :isShow="errorServer.isError" :text="errorServer.text"/>
      <BaseBtnSubmit text="Login" @submit="handlerLogin"
                     :isLoading="isLoading" :isDisabled="isSubmitDisabled"/>
    </form>
  </div>
</template>

<script setup>
import {useAuthStore} from "~/stores/auth.js";
import { errorMessageFromServer } from "~/form/RegisterAndLoginErrors.js";
import useErrorServerHandler from "~/composable/useErrorServerHandler.js";
import { isNotEmptyString } from '~/utils/validation/validators.js';

import ErrorText from "~/components/Base/ErrorText.vue";
import gsap from "~/gsap.js";

const labelClass = `block text-xm font-medium leading-6 mb-3`;
const inputClass = `block border-2 rounded-full border-primary px-[20px] py-[10px] w-full
        bg-transparent placeholder:text-text-600 outline-none focus:border-primary-500 transition duration-500
        focus:ring-0 sm:text-sm sm:leading-6`;


const email = ref('');
const password = ref('');

const isLoading = ref(false);

const loginFormInputs = {
  email: email,
  password: password,
}

const errorServerHandler = useErrorServerHandler(errorMessageFromServer, loginFormInputs);
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
    const loginFormInputs = {
      email: email.value,
      password: password.value,
    }
    isLoading.value = true;
    await authStore.login(loginFormInputs);
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