<template>
  <div>
    <form action="" class="from-animation flex flex-col items-end justify-between" @submit.prevent>
      <TextFormField
v-model="email"
                     :error="{isShowErrorText: fieldErrors?.email?.isError, textError: fieldErrors?.email?.text}"
                     is-has-error-text="true"
                     label="Email address" name="email" placeholder="Enter email"
                     type="email"/>
      <TextFormField
v-model="userName"
                     :error="{isShowErrorText: fieldErrors?.userName?.isError, textError: fieldErrors?.userName?.text}"
                     label="User Name" name="userName" placeholder="Enter user name"
                     type="text"/>
      <PasswordFormField
v-model="password"
                         :error="{isShowErrorText: fieldErrors?.password?.isError, textError: fieldErrors?.password?.text}"
                         label="Password" name="password"
                         placeholder="Enter password"/>
      <ErrorText :is-show="serverError.isError" :text="serverError.text"/>
      <BtnSubmit
:is-disabled="isSubmitDisabled"
                 :is-loading="isLoading" custom-classes="mt-4" text="Register"
                 @submit="handleRegister"/>
    </form>
  </div>
</template>

<script setup>
import BtnSubmit from "~/components/Base/BtnSubmit.vue";
import ErrorText from "~/components/Base/ErrorText.vue";
import TextFormField from "~/components/Base/TextFormField.vue";
import PasswordFormField from "~/components/Base/PasswordFormField.vue";
import {startFormInputsAnimation} from "~/animations/registerAnimation.js";

import {
  validationRulesAndErrorMessageRegisterForm,
  errorMessageFromServer
} from "~/errorsAndConfiguration/RegisterAndLoginErrors.js";
import {useAuthStore} from "~/stores/auth.js";

import useErrorFieldHandler from "~/composable/useErrorFieldHandler.js";
import useErrorServerHandler from "~/composable/useErrorServerHandler.js";


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
const handleFieldError = useErrorFieldHandler(registerFromInputs, validationRulesAndErrorMessageRegisterForm);
const fieldErrors = ref(handleFieldError.errors)

const handleServerError = useErrorServerHandler(errorMessageFromServer, registerFromInputs);
const serverError = ref(handleServerError.error);

onMounted(() => {
  startFormInputsAnimation();
})

const isSubmitDisabled = computed(() => {
  return handleFieldError.isFieldsEmpty.value
      || handleFieldError.isHaveError.value
      || handleServerError.isHaveError.value;

})

const isLoading = ref(false);

const handleRegister = async () => {

  handleFieldError.checkFieldsErrors();

  if (!handleFieldError.isHaveError.value) {
    try {
      isLoading.value = true;
      await authStore.register({
        email: email.value,
        userName: userName.value,
        password: password.value,
      });

    } catch (e) {
      handleServerError.checkServerErrors(e.type);
    } finally {
      isLoading.value = false;
    }
  }
}

</script>