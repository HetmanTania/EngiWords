import {isNotEmptyObject} from "~/utils/validation/validators.js";

export default function useErrorServerHandler(errorTextFromServer, registerFromInputs) {

    const error = ref({
        isError: false,
        text: '',
    });

    const checkServerErrors = (e) => {
        if(!isNotEmptyObject(errorTextFromServer)) {
            return;
        }

        const errorType = e.type;

        if(errorTextFromServer[errorType]) {
            error.value = {
                isError: true,
                text: errorTextFromServer[errorType]
            }
        }
        else {
            error.value = {
                isError: true,
                text: errorTextFromServer['default_error']
            }
        }

    }

    const setWatchers = () => {
        for (const valueKey in registerFromInputs) {
            watch(registerFromInputs[valueKey], () => {
                if(error.value.isError) {
                    resetError();
                }
            })
        }
    }

    const isHaveError =  computed(()=> {
        return error.value.isError
    })

    const resetError = () => {
        error.value = {
            isError: false,
            text: '',
        }
    }

    setWatchers();

    return {error, checkServerErrors, isHaveError, resetError}
}