/**
 * 监听文档是否处于预渲染状态
 * @param callback
 */
export const whenActivated = (callback: () => void) => {
    // 检查文档当前是否处于预渲染状态
    if (document.prerendering) {
        addEventListener('prerenderingchange', () => {
            callback();
        }, true);
    } else {
        callback();
    }
}