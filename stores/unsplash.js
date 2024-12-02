import axios from "axios";
import {unsplashErrors} from "~/errorsAndConfiguration/ErrorUnsplash.js";
import {isNotEmptyString} from "~/utils/validation/validators.js";

export const useUnsplashStore = defineStore('unsplash', () => {
    const BASE_URL = `https://api.unsplash.com/search/photos`;
    const URL_RANDOM = 'https://api.unsplash.com/photos/random'
    const clientId = 'pU0PWnSVB6VZdqbIcIqbO-WAMR7s-cwAzUb40_gm9po';

    const COUNT_PHOTOS = 15;

    const photos = ref([]);
    const hasError = ref(false);
    const fetchPhotos = async (query = '') => {
        try {
            const result = isNotEmptyString(query) ? await searchPhotosByQuery(query) : await fetchRandomPhotos();

            setPhotos(result);
            hasError.value = false;
        } catch (error) {
            handleError(error);
        }
    }

    const fetchRandomPhotos = async () => {
        const result = await axios.get(URL_RANDOM, {
            params: {
                client_id: clientId,
                count: COUNT_PHOTOS,
            }
        });

        return result.data;
    }

    const searchPhotosByQuery = async (query) => {
        const result = await axios.get(BASE_URL, {
            params: {
                query: query,
                client_id: clientId,
                per_page: COUNT_PHOTOS,
            }
        });

        if (!result.data.results.length) {
            throw unsplashErrors.NOT_FOUND;
        }

        return result.data.results;
    }

    const setPhotos = (data) => {
        if (!data.length) {
            photos.value = [];
        }

        photos.value = data.map((el) => {
            return el.urls.regular;
        });
    }

    const handleError = (error) => {
        console.log(error)
        hasError.value = true;
        if (error.code === unsplashErrors.NOT_FOUND.code) {
            photos.value = [];
            throw error;
        } else {
            throw unsplashErrors.REQUEST_ERROR;
        }
    }

    return {photos, hasError, fetchPhotos}

})
