import {isObject} from "./is";

type Params = Record<string, any>;

const buildQueryString = (obj: Params, prefix = ''): string => {
    return Object.keys(obj).reduce((acc, key) => {
        const value = obj[key];
        const prefixedKey = prefix ? `${prefix}[${key}]` : key;

        if (isObject(value)) {
            acc += buildQueryString(value, prefixedKey);
        } else {
            acc += `&${prefixedKey}=${value}`;
        }

        return acc;
    }, '');
};

export const joinQueryWithMap = (params: Params): string => {
    if (!isObject(params)) return '';

    const queryString = buildQueryString(params).slice(1); // Remove the initial '&'

    return queryString ? `${queryString}` : '';
};