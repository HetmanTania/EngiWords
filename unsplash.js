import axios from "axios";

const url = `https://api.unsplash.com/search/photos`
const clientId = 'pU0PWnSVB6VZdqbIcIqbO-WAMR7s-cwAzUb40_gm9po';

export const COUNT_PHOTOS = 15;
export const searchPhotosByQuery = async (query) => {
    const result = await axios.get(url, {
        params: {
            query: query,
            client_id: clientId,
            per_page: COUNT_PHOTOS,
        }
    });
    return result.data.results.map((el) => {
        return el.urls.regular;
    });
}

export const getRandomPhotos = async () => {
    const urlRandom ='https://api.unsplash.com/photos/random'
    const result = await axios.get(urlRandom, {
        params: {
            client_id: clientId,
            count: COUNT_PHOTOS,
        }
    });
    if(result.data.length) {
        return result.data.map((el) => {
            return el.urls.regular;
        });
    }
    return [];
}