import {DocumentReadyState} from "@/enum/DocumentReadyState";

/**
 * 监测页面是否处于加载完毕状态
 * loading -> interactive -> complete
 * @param callback
 * @link https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readyState
 */
export const onLoad = (callback: () => void) => {
    if (document.readyState == DocumentReadyState.COMPLETE) {
        callback()
        return;
    }

    document.addEventListener('readystatechange', (e) => {
        if (document.readyState === DocumentReadyState.COMPLETE) {
            callback();
        }
    })
}