/**
 * 检测 Dom 是否完全被加载完毕
 * @param callback
 */
export const whenDomContentLoaded = (callback: () => void) => {
    if (document.readyState === 'loading') {
        // 此时加载尚未完成
        document.addEventListener('DOMContentLoaded', () => callback());
    } else {
        // `DOMContentLoaded` 已经被触发
        callback();
    }
};
