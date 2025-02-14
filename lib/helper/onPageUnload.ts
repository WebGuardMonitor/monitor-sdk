/**
 * 监测页面是否处于卸载
 * @param callback
 */
export const onPageUnload = (callback: () => void) => {
    ['unload', 'beforeunload', 'pagehide'].forEach(event => {
        addEventListener(event, callback)
    })
}