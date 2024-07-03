<template>
  <button @click="logout">logout</button>
  <nuxt-link to="/SignIn">SignIn</nuxt-link>
</template>

<script setup>

const authStore = useAuthStore();

const logout = () => {
  authStore.logout()
}

</script>