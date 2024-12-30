import {WINDOW} from "../types";

/**
 * 创建每次进入的会话 ID
 */
export const generateSessionId = () => {
    return (`${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`).replace(
        /[018]/g,
        // @ts-ignore
        (c) => (+c ^ WINDOW.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16),
    );
}