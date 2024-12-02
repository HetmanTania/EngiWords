import { useAuthStore } from "~/stores/auth.js";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  if (authStore.isAuth && to.path === "/SignIn") {
    return abortNavigation();
  }
});
