import {navigateTo} from "#app";
import {useAuthStore} from "~/stores/auth.js";

export default defineNuxtRouteMiddleware( (to, from) => {
    if (to.path === from.path) {
        return;
    }
    const authStore = useAuthStore();
    if(authStore.isAuth && to.path === '/SignIn') {
        return navigateTo(from.fullPath);
    }
})