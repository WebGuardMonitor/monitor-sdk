import {whenActivated} from "./whenActivated";
import {COMPLETE} from "../common";

/**
 * 确保页面准备好后执行回调函数。
 *
 * 这个函数检查页面的加载状态，并在页面完全准备好后执行提供的回调函数。
 * 它考虑了三种情况：
 * 1. 页面正在预渲染（通常用于服务器端渲染场景）。
 * 2. 页面尚未完全加载。
 * 3. 页面已经加载完成。
 *
 * @param callback - 当文档准备好后需要执行的函数。
 */
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