import {isNotEmptyStringOrFilledSpaces} from "~/utils/validation/validators.js";

const create = {
    title: 'Create a new Word List',
    titleBtn: 'Save',
    isSubmitDisabled: ({title}) => {
       return !isNotEmptyStringOrFilledSpaces(title);
    }
}

const edit = {
    title: 'Edit a new Word List',
    titleBtn: 'Save',
    isSubmitDisabled: ({editWordList, propsWordList}) => {
        return !(editWordList.name !== propsWordList.name ||
            editWordList.pathToImg !== propsWordList.pathToImg) ||
            !isNotEmptyStringOrFilledSpaces(editWordList.name)
    }
}

const remove = {
    title: 'Are you sure you want to delete this Word List?',
    titleBtn: 'Yes',
    isSubmitDisabled: () => {
        return false;
    }
}

export const configurationWordList = {
    create: create,
    edit: edit,
    remove: remove,
}