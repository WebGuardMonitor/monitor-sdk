import {WINDOW} from "../types";

export const getLocalStorage = (key: string): string | null => {
    const value = WINDOW.localStorage.getItem(key);

    if (value) {
        return value;
    }

    return null;
};

export const setLocalStorage = (key: string, value: string): void => {
    WINDOW.localStorage.setItem(key, value);
};

export const deleteLocalStorage = (key: string) => {
    WINDOW.localStorage.removeItem(key);
};
export const clearLocalStorage = () => {
    Object.keys(WINDOW.localStorage).forEach((key) => WINDOW.localStorage.removeItem(key))
};