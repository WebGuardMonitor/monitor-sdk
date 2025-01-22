/**
 * 监听页面是否是从别的窗口切换回来
 * @param callback
 */
export const whenVisible = (callback: (e: Event) => void) => {
    document.addEventListener('visibilitychange', (event: Event) => {
        if (document.visibilityState === 'visible') {
            callback(event)
        }
    })
}