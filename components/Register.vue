<template>
  <div>
    <form class="from-animation flex flex-col items-end justify-between" action="" @submit.prevent>
      <TextFormField is-has-error-text="true" v-model="email" placeholder="Enter email" name-input="email" text-label="Email address" type="email"
                      :error="{isShowErrorText: errorsField?.email?.isError, textError: errorsField?.email?.text}"/>
      <TextFormField v-model="userName" placeholder="Enter user name" name-input="userName" text-label="User Name" type="text"
                       :error="{isShowErrorText: errorsField?.userName?.isError, textError: errorsField?.userName?.text}"/>
      <PasswordFormField v-model="password" placeholder="Enter password" name-input="password" text-label="Password"
                           :error="{isShowErrorText: errorsField?.password?.isError, textError: errorsField?.password?.text}"/>
      <ErrorText :is-show="errorServer.isError" :text="errorServer.text"/>
      <BtnSubmit  @submit="handleRegister"
                  text="Register" :is-loading="isLoading" :is-disabled="isSubmitDisabled"
                  custom-classes="mt-4"/>
    </form>
  </div>
</template>

<script setup>
import BtnSubmit from "~/components/Base/BtnSubmit.vue";
import ErrorText from "~/components/Base/ErrorText.vue";
import TextFormField from "~/components/Base/TextFormField.vue";
import PasswordFormField from "~/components/Base/PasswordFormField.vue";

import {validationRulesAndErrorMessageRegisterForm, errorMessageFromServer} from "~/form/RegisterAndLoginErrors.js";
import {useAuthStore} from "~/stores/auth.js";

import useErrorFieldHandler from "~/composable/useErrorFieldHandler.js";
import useErrorServerHandler from "~/composable/useErrorServerHandler.js";
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