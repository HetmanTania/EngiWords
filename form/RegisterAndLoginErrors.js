import {emailRegex, userNameRegex, passwordRegex} from '~/utils/validation/regExp.js';
import {isNotEmptyString} from "~/utils/validation/validators.js";

const validationRulesRegister = {
    email: emailRegex,
    userName: userNameRegex,
    password: passwordRegex
}

const errorsRegister = {
    email: {
        EMAIL_IS_INCORRECT_FORMAT: 'The mailing address must contain from 3 to 10 characters of the Latin alphabet in the format example@example.com',
    },
    userName: {
        USERNAME_IS_INCORRECT_FORMAT: 'The username must contain from 3 to 10 characters of the Latin alphabet',
    },
    password: {
        PASSWORD_IS_INCORRECT_FORMAT: 'The password must contain symbols and/or numbers',
    }
}


export const errorTextFromServer = {
    user_already_exists: 'A user with the same email address already exists',
    user_email_already_exists: 'A user with the same email address already exists',
    general_query_limit_exceeded: 'Too many registration attempts. Please try again after some time.',
    general_rate_limit_exceeded: 'Too many registration attempts. Please try again after some time.',
    user_unauthorized: 'The current user is not authorized to perform the requested action.',
    user_invalid_credentials: 'Invalid credentials. Please check the email and password.',
    user_not_found: 'The specified user email address does not exist.',
    general_argument_invalid: 'Invalid `email` param: Value must be a valid email address',
    invalid_credentials: 'The specified user email address does not exist.',
    unauthorized: 'The user does not have permission to perform the requested action.',
    server_error: 'A general error has occurred on the server. Please try again after some time.',
    general_server_error: 'A general error has occurred on the server. Please try again after some time.',
    default_error: 'Something went wrong. Please try again after some time.',
}

export const validationRulesAndErrorTextRegisterForm = {
    email: {
        regex: validationRulesRegister.email,
        errText: errorsRegister.email.EMAIL_IS_INCORRECT_FORMAT
    },
    userName: {
        regex: validationRulesRegister.userName,
        errText: errorsRegister.userName.USERNAME_IS_INCORRECT_FORMAT
    },
    password: {
        regex: validationRulesRegister.password,
        errText: errorsRegister.password.PASSWORD_IS_INCORRECT_FORMAT
    }
}

export function checkErrorTypeServerError(errorType) {
    if(!isNotEmptyString(errorType)) {
        return;
    }

    return Object.keys(errorTextFromServer).find((el) => {
        return errorType === el;
    })
}