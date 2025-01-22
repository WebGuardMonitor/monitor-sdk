/**
 * 当文档从预渲染状态变为激活状态时执行回调。
 * 如果文档当前不在预渲染状态，则立即执行回调。
 *
 * @param callback - 当文档被激活时需要执行的函数。
 */
export const whenActivated = (callback: () => void) => {
    // 检查文档当前是否处于预渲染状态
    if (document.prerendering) {
        // 如果文档处于预渲染状态，则添加一个事件监听器
        // 当预渲染状态改变时（即文档被激活时）执行回调
        addEventListener('prerenderingchange', () => {
            // 注意：这里应该检查预渲染状态是否确实已经改变为非预渲染状态再执行回调，
            // 但由于API限制，我们假设事件触发即意味着文档已被激活。
            // 在实际使用中，可能需要根据具体需求调整此逻辑。
            callback()
        }, true); // 在捕获阶段监听事件
    } else {
        callback();
    }
}