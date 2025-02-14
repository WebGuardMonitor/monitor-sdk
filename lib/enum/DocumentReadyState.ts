/**
 * @link https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readyState
 */
export enum DocumentReadyState {
    /**
     * 浏览器正在加载文档
     */
    LOADING = 'loading',
    /**
     * 文档已经加载完成，但是可能尚未加载所有的外部资源
     */
    INTERACTIVE = 'interactive',
    /**
     * 文档已经加载完成，并且所有的外部资源（如图片、样式表、iframe等）都已经加载完成
     */
    COMPLETE = 'complete'
}