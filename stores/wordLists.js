import { isNotEmptyArray, isNotEmptyString} from "~/utils/validation/validators.js";
import {ID, databases} from "~/appwrite.js";
import {APPWRITE_COLLECTION_WORDLIST_ID, APPWRITE_DATABASE_ID} from "~/utils/constants.js";
import {useAuthStore} from "~/stores/auth.js";
import {Query} from "appwrite";

export const useWordListsStore = defineStore('wordLists', () => {
    const wordLists = ref([]);

    const { getUserId } = useAuthStore();

    const requestWordLists = async () => {
        try {
            const result =
                await databases.listDocuments(
                    APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_WORDLIST_ID,
                    [Query.equal('user_id', getUserId())
                    ]);
            wordLists.value = result.documents.map((wordList) => {
                return {
                    name: wordList.name,
                    pathToImg: wordList.path_to_img,
                    id: wordList.id,
                    $id: wordList.$id,
                }
            })

        } catch (e) {
            console.log(e)
        }
    }

    const createWordList = async (wordList) => {
        if(!isNotEmptyString(wordList.name) && !isNotEmptyString(wordList.pathToImg)) {
            return;
        }

        const data = {
            name: wordList.name,
            path_to_img: wordList.pathToImg,
            id: ID.unique(),
            user_id: getUserId()
        }

        try {
            const wordList = await databases.createDocument(APPWRITE_DATABASE_ID,
                APPWRITE_COLLECTION_WORDLIST_ID,
                ID.unique(),
                data,
            );
            addWordList(wordList);
        } catch (e) {
            console.log(e)
        }

    }

    const addWordList = (wordList) => {
        wordLists.value = [...wordLists.value, {
            name: wordList.name,
            pathToImg: wordList.path_to_img,
            id: wordList.id,
            $id: wordList.$id,
        }];
    }

    const deleteWordListRequest = async (id) => {

        try {
            await databases.deleteDocument(APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_WORDLIST_ID, id);
            deleteWordList(id);
        } catch (e) {
            console.log(e)
        }

    }

    const deleteWordList = (id) => {
        wordLists.value = wordLists.value.filter((el) => el.$id !== id);
    }

    const editWordListRequest = async (id, { name, pathToImg }) =>  {
        try {
            await databases.updateDocument(APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_WORDLIST_ID, id,
                {
                    name,
                    path_to_img: pathToImg
                });
            editWordList(id, { name, pathToImg });
        } catch (e) {
            console.log(e)
        }
    }


    const editWordList = (id, { name, pathToImg }) => {
        wordLists.value = wordLists.value.map((el) => {
            if(el.$id === id) {
                return {
                    ...el,
                    name: name,
                    pathToImg: pathToImg
                }
            }
            return el;
        })
    }

    const getWordList = (id) => {
        return wordLists.value.find((el) => el.$id === id)
    }
    return { wordLists, getWordList, requestWordLists, createWordList, editWordListRequest, deleteWordListRequest }
})

function findWordListById(wordLists, id) {
    if(!isNotEmptyArray(wordLists)) { // check id
        return -1;
    }

    return wordLists.find(item => item.$id === id);
}

function getIndexWordListById(wordLists, id) {
    if(!isNotEmptyArray(wordLists)) { // check id
        return -1;
    }

    return wordLists.findIndex(item => item.$id === id);
}