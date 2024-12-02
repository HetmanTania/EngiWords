import {isNotEmptyObject, isNotEmptyString} from "~/utils/validation/validators.js";

export default function useErrorServerHandler(serverErrorMessages, registerFromInputs) {

    const error = ref({
        isError: false,
        text: '',
    });

    const checkServerErrors = (errorType) => {
        if (!isNotEmptyObject(serverErrorMessages) || !isNotEmptyString(errorType)) {
            return;
        }

        error.value = validateServerError(errorType)
    }

    const validateServerError = (errorType) => {
        const errorMessage = getErrorMessage(errorType);
        return {isError: true, text: errorMessage};
    }

    const getErrorMessage = (errorType) => {
        return serverErrorMessages[errorType] || serverErrorMessages['default_error'];
    }

    const setWatchers = () => {
        Object.keys(registerFromInputs).forEach((key) => {
            watch(registerFromInputs[key], () => {
                if (error.value.isError) {
                    resetError();
                }
            })
        })
    }

    const isHaveError = computed(() => {
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