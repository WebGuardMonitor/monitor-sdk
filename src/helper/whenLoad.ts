import {COMPLETE} from "../common";

export const whenLoad = (callback: () => void) => {
    document.addEventListener('readystatechange', () => {
        if (document.readyState === COMPLETE) {
            callback()
        }
    })
}