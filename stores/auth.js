import { account, ID } from "~/appwrite.js";
import {navigateTo} from "#app";

import {checkErrorTypeServerError} from "~/form/RegisterAndLoginErrors.js";

export const useAuthStore = defineStore('auth', () =>
    {
        const user = ref(null);
        const session = ref(null);

        const initSession = async () => {
            try {
                const currentSession = await account.getSession('current');
                const userAccount = await account.get();
                if(userAccount && session) {
                    session.value = currentSession;
                    user.value = userAccount;
                    await navigateTo('/')
                }
                else {
                    user.value = null;
                    await navigateTo('/SignIn');
                }

            } catch (e) {
                user.value = null;
                await navigateTo('/SignIn');
            }
        }

        const register = async ({email, userName, password}) => {
            try {
                await account.create(ID.unique(), email, password, userName);
                await login({email, password});

            } catch (e) {
                if(checkErrorTypeServerError(e.type)) {
                    throw e;
                }
            }
        }

        const login = async ({ email, password }) => {
            try {
                await account.createEmailPasswordSession(email, password);
                await initSession();
            } catch (e) {
                console.log(e);
                if(checkErrorTypeServerError(e.type)) {
                    throw e;
                }
            }
        }

        const logout = async () => {
            try {
                await account.deleteSession("current");
                user.value = null;
                await navigateTo('/SignIn');
            } catch(e){
                console.log(e);
            }
        }

        const isAuth = computed(() => {
            return !!user.value
        })

        function getUserId() {
            return user?.value?.$id;
        }

        return { user, getUserId, initSession, register, login, logout, isAuth }
    }
)