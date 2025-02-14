/**
 * 监听页面是否是来自缓存状态
 * @param callback
 * @link https://developer.mozilla.org/zh-CN/docs/Web/API/Window/pageshow_event
 */
export const whenCachePageStore = (callback: (event: PageTransitionEvent) => void) => {
    addEventListener('pageshow', (event) => {
        // 状态是否是来自缓存。
        if (event.persisted) {
            callback(event);
        }
    }, true)
}