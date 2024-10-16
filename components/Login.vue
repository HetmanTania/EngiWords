<template>
  <div>
    <form class="from-animation flex flex-col items-end justify-between" action="" @submit.prevent>
      <TextFormField v-model="email" placeholder="Enter email" name-input="email" text-label="Email address" type="email"/>
      <PasswordFormField v-model="password" placeholder="Enter password" name-input="password" text-label="Password"/>
      <ErrorText :is-show="errorServer.isError" :text="errorServer.text"/>
      <BaseBtnSubmit  @submit="handleLogin"
                      text="Login" :is-loading="isLoading"
                      :is-disabled="isSubmitDisabled" custom-classes="mt-4"/>
    </form>
  </div>
</template>

<script setup>
import ErrorText from "~/components/Base/ErrorText.vue";
import TextFormField from "~/components/Base/TextFormField.vue";
import PasswordFormField from "~/components/Base/PasswordFormField.vue";

import {useAuthStore} from "~/stores/auth.js";

import { errorMessageFromServer } from "~/form/RegisterAndLoginErrors.js";
import useErrorServerHandler from "~/composable/useErrorServerHandler.js";
import { isNotEmptyString } from '~/utils/validation/validators.js';

import gsap from "~/gsap.js";

definePageMeta({
  layout: 'auth'
});

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

const handleLogin = async () => {
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