import { account, ID } from "~/appwrite.js";
import { navigateTo } from "#app";
import { checkErrorTypeServerError } from "~/errorsAndConfiguration/RegisterAndLoginErrors.js";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const session = ref(null);

  const initSession = async () => {
    try {
      const currentSession = await account.getSession("current");
      const userAccount = await account.get();

      if (userAccount && session) {
        session.value = currentSession;
        user.value = userAccount;
        await navigateTo("/");
      } else {
        await userNotLogin();
      }
    } catch (e) {
      await userNotLogin();
    } finally {
    }
  };

  const register = async ({ email, userName, password }) => {
    try {
      await account.create(ID.unique(), email, password, userName);
      await login({ email, password });
    } catch (e) {
      if (checkErrorTypeServerError(e.type)) {
        throw e;
      }
    }
  };

  const login = async ({ email, password }) => {
    try {
      await account.createEmailPasswordSession(email, password);
      await initSession();
    } catch (e) {
      console.log(e);
      if (checkErrorTypeServerError(e.type)) {
        throw e;
      }
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      await userNotLogin();
    } catch (e) {
      console.log(e);
    }
  };

  const userNotLogin = async () => {
    user.value = null;
    session.value = null;
    await navigateTo("/SignIn");
  };

  const isAuth = computed(() => {
    return !!user.value;
  });

  const userEmail = computed(() => {
    return user.value?.email;
  });

  function getUserId() {
    return user?.value?.$id;
  }

  return {
    user,
    getUserId,
    initSession,
    register,
    login,
    logout,
    isAuth,
    userEmail,
  };
});
