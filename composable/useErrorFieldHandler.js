import { isNotEmptyObject} from "~/utils/validation/validators.js";

export default function useErrorFieldHandler(registerFromInputs, validationRulesAndErrorText) {

    const errors = ref({});

    const initErrors = () => {
        for (const registerFromInputsKey in registerFromInputs) {
            errors.value[registerFromInputsKey] = {
                isError: false,
                text: '',
            }
        }
    }

    const checkFieldsErrors = () => {

        if(!isNotEmptyObject(registerFromInputs.value) && !isNotEmptyObject(validationRulesAndErrorText)) {
            return;
        }

        for (const formItemsKey in registerFromInputs) {
            if(!validationRulesAndErrorText[formItemsKey].regex.test(registerFromInputs[formItemsKey].value)) {
                errors.value[formItemsKey] = {
                    isError: true,
                    text: validationRulesAndErrorText[formItemsKey].errText
                };
            }
        }
    }

    const isFieldsEmpty = computed(() => {
        return Object.values(registerFromInputs).some((item) => !item.value.length);
    })

    const isHaveError = computed(() => {
        return Object.values(errors.value).some((error) => error.isError);
    })

    const setWatchers = () => {
        for (const valueKey in registerFromInputs) {
            watch(registerFromInputs[valueKey], () => {
                if(errors.value[valueKey]?.isError) {
                    resetError(valueKey);
                }
            })
        }
    }

    const resetAllErrors = () => {
        for (const errorsKey in errors.value) {
            resetError(errorsKey)
        }
    }

    const resetError = (key) => {
        errors.value[key] = {
            isError: false,
            text: '',
        };
    }

    initErrors();
    setWatchers();

    return { errors, checkFieldsErrors, isHaveError, isFieldsEmpty, resetError, resetAllErrors };

}