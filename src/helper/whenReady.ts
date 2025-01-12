import {whenActivated} from "./whenActivated";
import {COMPLETE} from "../common";

export const whenReady = (callback: () => void) => {
    if (document.prerendering) {
        whenActivated(() => whenReady(callback));
    } else if (document.readyState !== COMPLETE) {
        addEventListener('load', () => whenReady(callback), true);
    } else {
        // Queue a task so the callback runs after `loadEventEnd`.
        setTimeout(callback, 0);
    }
}