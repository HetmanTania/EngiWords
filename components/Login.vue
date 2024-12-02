<template>
  <div>
    <form
      action=""
      class="from-animation flex flex-col items-end justify-between"
      @submit.prevent
    >
      <TextFormField
        v-model="email"
        label="Email address"
        name="email"
        placeholder="Enter email"
        type="email"
      />
      <PasswordFormField
        v-model="password"
        label="Password"
        name="password"
        placeholder="Enter password"
      />
      <ErrorText :is-show="serverError.isError" :text="serverError.text" />
      <BaseBtnSubmit
        :is-disabled="isSubmitDisabled"
        :is-loading="isLoading"
        custom-classes="mt-4"
        text="Login"
        @submit="handleLogin"
      />
    </form>
  </div>
</template>

<script setup>
import ErrorText from "~/components/Base/ErrorText.vue";
import TextFormField from "~/components/Base/TextFormField.vue";
import PasswordFormField from "~/components/Base/PasswordFormField.vue";
import { startFormInputsAnimation } from "~/animations/loginAimation.js";
import { useAuthStore } from "~/stores/auth.js";

import useErrorServerHandler from "~/composable/useErrorServerHandler.js";
import { errorMessageFromServer } from "~/errorsAndConfiguration/RegisterAndLoginErrors.js";
import { isNotEmptyString } from "~/utils/validation/validators.js";

definePageMeta({
  layout: "auth",
});

const authStore = useAuthStore();

const email = ref("");
const password = ref("");

const isLoading = ref(false);

const handleServerError = useErrorServerHandler(errorMessageFromServer, {
  email: email,
  password: password,
});
const serverError = ref(handleServerError.error);

onMounted(() => {
  startFormInputsAnimation();
});

const isSubmitDisabled = computed(() => {
  return (
    handleServerError.isHaveError.value ||
    !isNotEmptyString(email.value) ||
    !isNotEmptyString(password.value)
  );
});

const handleLogin = async () => {
  try {
    isLoading.value = true;
    await authStore.login({
      email: email.value,
      password: password.value,
    });
  } catch (e) {
    handleServerError.checkServerErrors(e.type);
  } finally {
    isLoading.value = false;
  }
};
</script>
