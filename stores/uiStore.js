export const useUIStore = defineStore('uiStore', () => {
    const isPageLoaderShow = ref(false);


    const showPageLoader = () => {
        isPageLoaderShow.value = true;
    }
    const hiddenPageLoader = () => {
        isPageLoaderShow.value = false;
    }

    return {isPageLoaderShow, showPageLoader, hiddenPageLoader}
})