import {isNotEmptyObject} from "~/utils/validation/validators.js";

export default function useErrorFieldHandler(formInputs, validationRulesAndErrorMessage) {

    const errors = ref({});

    const initializeErrors = () => {
        Object.keys(formInputs).forEach((key) => {
            initializeErrorEmpty(key);
        });
    };

    const checkFieldsErrors = () => {
        if (!isNotEmptyObject(formInputs) || !isNotEmptyObject(validationRulesAndErrorMessage)) {
            return;
        }

        Object.keys(formInputs).forEach((key) => {
            errors.value[key] = validateField(key, formInputs[key].value);
        });
    };

    const validateField = (fieldKey, fieldValue) => {
        const validationRule = validationRulesAndErrorMessage[fieldKey];
        if (!validationRule.regex.test(fieldValue)) {
            return {text: validationRule.errText, isError: true};
        }

        return {text: '', isError: false};
    };

    const isFieldsEmpty = computed(() => {
        return Object.values(formInputs).some((item) => !item.value.length);
    });


    const isHaveError = computed(() => {
        return Object.values(errors.value).some((error) => error.isError);
    });

    const setWatchers = () => {
        Object.keys(formInputs).forEach((key) => {
            watch(formInputs[key], () => {
                if (errors.value[key]?.isError) {
                    initializeErrorEmpty(key);
                }
            });
        });
    };

    const resetAllErrors = () => {
        Object.keys(errors.value).forEach((key) => {
            initializeErrorEmpty(key);
        });
    };

    const initializeErrorEmpty = (key) => {
        errors.value[key] = {
            isError: false,
            text: '',
        };
    };

    onMounted(() => {
        initializeErrors();
        setWatchers();
    })

    return {errors, checkFieldsErrors, isHaveError, isFieldsEmpty};

}