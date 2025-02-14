import { COMPLETE } from '../common';

/**
 * 监听页面所有内容都已被完全加载。
 * loading -> interactive -> complete
 * @param callback
 * @link https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readyState
 */
export const whenLoad = (callback: () => void) => {
    document.addEventListener('readystatechange', () => {
        if (document.readyState === COMPLETE) {
            callback();
        }
    });
};
