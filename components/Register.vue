<template>
  <div>
    <form class="from-animation flex flex-col items-end justify-between" action="" @submit.prevent>
     <div class="flex flex-col items-start justify-between w-full">
       <label :class="labelClass" for="email">Email address</label>
       <TextInput v-model="email" type="email" id="email" name="email" placeholder="Enter email"/>
       <ErrorText :is-show="errorsField?.email?.isError" :text="errorsField?.email?.text"/>
     </div>
      <div class="flex flex-col items-start justify-between w-full mt-5">
        <label :class="labelClass" for="userName">User name</label>
        <TextInput v-model="userName" type="text" id="userName" name="userName" placeholder="Enter user name"/>
        <ErrorText :is-show="errorsField?.userName?.isError" :text="errorsField?.userName?.text"/>
      </div>
      <div class="flex flex-col items-start justify-between w-full mt-5">
        <label :class="labelClass" for="email">Password</label>
        <input
              id="password" v-model.trim="password"
               :class="inputClass" type="password" name="password" placeholder="Enter password" >
        <ErrorText :is-show="errorsField?.password?.isError" :text="errorsField?.password?.text" />
      </div>
      <ErrorText :is-show="errorServer.isError" :text="errorServer.text"/>
      <BtnSubmit  @submit="handlerRegister"
                  text="Register" :is-loading="isLoading"
                 :is-disabled="isSubmitDisabled" custom-classes="mt-4"/>
    </form>
  </div>
</template>

<script setup>
import {validationRulesAndErrorMessageRegisterForm, errorMessageFromServer} from "~/form/RegisterAndLoginErrors.js";
import {useAuthStore} from "~/stores/auth.js";

import useErrorFieldHandler from "~/composable/useErrorFieldHandler.js";
import useErrorServerHandler from "~/composable/useErrorServerHandler.js";
import BtnSubmit from "~/components/Base/BtnSubmit.vue";
import ErrorText from "~/components/Base/ErrorText.vue";
import gsap from "~/gsap.js";
import TextInput from "~/components/Base/TextInput.vue";

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