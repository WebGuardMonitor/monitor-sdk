import { isObject } from '../is';

/**
 * Checks if the environment is a browser and returns the window object if true.
 * @returns {Window | undefined} The window object if in a browser environment, otherwise undefined.
 */
// @ts-ignore
export const getDefaultBrowser = (): Window | undefined => {
    // Check if 'window' is defined and is an object
    if (typeof window !== 'undefined' && typeof window === 'object' && isObject(window)) {
        return window;
    }

    return undefined;
};
