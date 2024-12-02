import { OPERATION_WITH_DATA } from "~/utils/constants.js";
import { urlRegex } from "~/utils/validation/regExp.js";

function isNumber(value) {
  return typeof value === "number";
}

export function isBoolean(value) {
  return typeof value === "boolean";
}

export function isNull(value) {
  return value === null;
}

export function isNaN(value) {
  return Number.isNaN(value);
}

export function isString(value) {
  return typeof value === "string";
}

export function isNotEmptyString(value) {
  return isString(value) && value.length > 0;
}

export function isNotEmptyStringOrFilledSpaces(value) {
  return isNotEmptyString(value) && value.trim().length > 0;
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
  return value && typeof value === "object";
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

export function isWordList(value) {
  return value && value?.name && value?.pathToImg && value?.id;
}

export function isOPERATION_WITH_DATA(operation) {
  return (
    operation.length &&
    (operation === OPERATION_WITH_DATA.create ||
      operation === OPERATION_WITH_DATA.remove ||
      operation === OPERATION_WITH_DATA.edit)
  );
}

export function isValidUrl(url) {
  return isNotEmptyStringOrFilledSpaces(url) && urlRegex.test(url);
}
