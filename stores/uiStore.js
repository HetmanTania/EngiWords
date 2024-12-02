export const useUIStore = defineStore("uiStore", () => {
  const isPageLoaderShow = ref(true);

  const showPageLoader = () => {
    isPageLoaderShow.value = true;
  };
  const hiddenPageLoader = () => {
    isPageLoaderShow.value = false;
  };

  return { isPageLoaderShow, showPageLoader, hiddenPageLoader };
});
