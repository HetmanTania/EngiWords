<template>
  <div>
    <form @submit.prevent class="flex flex-col items-end justify-between" action="">
     <div class="flex flex-col items-start justify-between w-full">
       <label :class="labelClass" for="email">Email address</label>
       <input v-model.trim="email" :class="inputClass"
           type="email" id="email" name="email" placeholder="Enter email" />
       <ErrorText :isShow="errorsField?.email?.isError" :text="errorsField?.email?.text"/>
     </div>
      <div class="flex flex-col items-start justify-between w-full mt-5">
        <label :class="labelClass" for="userName">User name</label>
        <input v-model.trim="userName" :class="inputClass"
               type="text" id="userName" name="userName" placeholder="Enter user name" />
        <ErrorText :isShow="errorsField?.userName?.isError" :text="errorsField?.userName?.text"/>
      </div>
      <div class="flex flex-col items-start justify-between w-full mt-5">
        <label :class="labelClass" for="email">Password</label>
        <input v-model.trim="password" :class="inputClass"
               type="password" id="password" name="password" placeholder="Enter password" />
        <ErrorText :isShow="errorsField?.password?.isError" :text="errorsField?.password?.text" />
      </div>
      <ErrorText :isShow="errorServer.isError" :text="errorServer.text"/>
      <BtnSubmit text="Register" @submit="handlerRegister"
                 :isLoading="isLoading" :isDisabled="isSubmitDisabled"/>
    </form>
  </div>
</template>

<script setup>
import {validationRulesAndErrorTextRegisterForm, errorTextFromServer} from "~/form/RegisterAndLoginErrors.js";
import {useAuthStore} from "~/stores/auth.js";

import useErrorFieldHandler from "~/composable/useErrorFieldHandler.js";
import useErrorServerHandler from "~/composable/useErrorServerHandler.js";
import BtnSubmit from "~/components/Base/BtnSubmit.vue";
import ErrorText from "~/components/Base/ErrorText.vue";

const labelClass = `block text-xm font-medium leading-6 mb-3`;
const inputClass = `block border-2 rounded-full border-primary px-[20px] py-[10px] w-full
        bg-transparent placeholder:text-text-600 outline-none focus:border-primary-500 transition duration-500
        focus:ring-0 sm:text-sm sm:leading-6`;



const authStore = useAuthStore();

const email = ref('');
const userName = ref('');
const password = ref('');

const registerFromInputs = {
  email: email,
  userName: userName,
  password: password,
}
const errorFieldHandler = useErrorFieldHandler(registerFromInputs, validationRulesAndErrorTextRegisterForm);
const errorsField = ref(errorFieldHandler.errors)

const errorServerHandler = useErrorServerHandler(errorTextFromServer, registerFromInputs);
const errorServer = ref(errorServerHandler.error);

const isSubmitDisabled = computed(() => {
  return errorFieldHandler.isFieldsEmpty.value || errorServerHandler.isHaveError.value;
})

const isLoading = ref(false);

const handlerRegister = async () => {

  errorFieldHandler.checkFieldsErrors();

  if (!errorFieldHandler.isHaveError.value) {
    const registerFromInputsValue = {
      email: email.value,
      userName: userName.value,
      password: password.value,
    }
    try {
      isLoading.value = true;
      await authStore.register(registerFromInputsValue);

    } catch (e) {
      errorServerHandler.checkServerErrors(e);
    }
    finally {
      isLoading.value = false;
    }
  }
}



</script>