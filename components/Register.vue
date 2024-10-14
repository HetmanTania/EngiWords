<template>
  <div>
    <form class="from-animation flex flex-col items-end justify-between" action="" @submit.prevent>
     <div class="flex flex-col items-start justify-between w-full">
       <BaseLabel text="Email address" nameInput="email"/>
       <TextInput v-model="email" type="email" id="email" name="email" placeholder="Enter email"/>
       <ErrorText :is-show="errorsField?.email?.isError" :text="errorsField?.email?.text"/>
     </div>
      <div class="flex flex-col items-start justify-between w-full mt-5">
        <BaseLabel text="User name" nameInput="userName"/>
        <TextInput v-model="userName" type="text" id="userName" name="userName" placeholder="Enter user name"/>
        <ErrorText :is-show="errorsField?.userName?.isError" :text="errorsField?.userName?.text"/>
      </div>
      <div class="flex flex-col items-start justify-between w-full mt-5">
        <BaseLabel text="Password" nameInput="password"/>
        <BasePasswordInput  id="password" v-model.trim="password"
                            name="password" placeholder="Enter password"/>
        <ErrorText :is-show="errorsField?.password?.isError" :text="errorsField?.password?.text" />
      </div>
      <ErrorText :is-show="errorServer.isError" :text="errorServer.text"/>
      <BtnSubmit  @submit="handleRegister"
                  text="Register" :is-loading="isLoading" :is-disabled="isSubmitDisabled"
                  custom-classes="mt-4"/>
    </form>
  </div>
</template>

<script setup>
import {validationRulesAndErrorMessageRegisterForm, errorMessageFromServer} from "~/form/RegisterAndLoginErrors.js";
import {useAuthStore} from "~/stores/auth.js";

import useErrorFieldHandler from "~/composable/useErrorFieldHandler.js";
import useErrorServerHandler from "~/composable/useErrorServerHandler.js";

import BaseLabel from "~/components/Base/BaseLabel.vue";
import BtnSubmit from "~/components/Base/BtnSubmit.vue";
import ErrorText from "~/components/Base/ErrorText.vue";
import TextInput from "~/components/Base/TextInput.vue";

import gsap from "~/gsap.js";

definePageMeta({
  layout: 'auth'
})

const authStore = useAuthStore();

const email = ref('');
const userName = ref('');
const password = ref('');

const registerFromInputs = {
  email: email,
  userName: userName,
  password: password,
}
const errorFieldHandler = useErrorFieldHandler(registerFromInputs, validationRulesAndErrorMessageRegisterForm);
const errorsField = ref(errorFieldHandler.errors)

const errorServerHandler = useErrorServerHandler(errorMessageFromServer, registerFromInputs);
const errorServer = ref(errorServerHandler.error);

onMounted(() => {
  startFormInputsAnimation();
})

const isSubmitDisabled = computed(() => {
  return errorFieldHandler.isFieldsEmpty.value
      || errorFieldHandler.isHaveError.value
      || errorServerHandler.isHaveError.value;

})

const isLoading = ref(false);

const handleRegister = async () => {

  errorFieldHandler.checkFieldsErrors();

  if (!errorFieldHandler.isHaveError.value) {
    try {
      isLoading.value = true;
      await authStore.register({
        email: email.value,
        userName: userName.value,
        password: password.value,
      });

    } catch (e) {
      errorServerHandler.checkServerErrors(e.type);
    }
    finally {
      isLoading.value = false;
    }
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