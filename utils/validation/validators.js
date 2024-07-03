function isNumber(value) {
    return typeof value === 'number';
}

export function isBoolean(value) {
    return typeof value === 'boolean';
}


export function isNull(value) {
    return value === null;
}

export function isNaN(value) {
    return Number.isNaN(value);
}

export function isString(value) {
    return typeof value === 'string'
}
export function isNotEmptyString(value) {
    return isString(value) && value.length > 0;
}

export function isArray(value) {
    return Array.isArray(value);
}


export function isNotEmptyArray(value) {
    return isArray(value) && value.length > 0;
}


export function isNotEmptyObject(value) {
    return isObject(value) && Object.keys(value).length !== 0;
}

export function isObject(value) {
    return value && typeof value === 'object';
}

export function isUndefinedOrNull(value) {
    return value === null || isUndefined(value);
}

export function isNumberOrNull(value) {
    return isNumber(value) || isUndefined(value);
}

export function isUndefined(value) {
    return value === undefined;
}

export function isBetween(value, start, end) {
    return value >= start && value <= end;
}