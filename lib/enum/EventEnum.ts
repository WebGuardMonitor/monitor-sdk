/**
 * 事件枚举
 */
export enum EventEnum {
    /**
     * 点击事件
     * @link https://developer.mozilla.org/zh-CN/docs/Web/API/Element/click_event
     */
    CLICK = 'click',

    // 错误事件
    ERROR = 'error',

    /**
     * 某元素点击两次的事件
     * @link https://developer.mozilla.org/zh-CN/docs/Web/API/Element/dblclick_event
     */
    DBL_CLICK = 'dblclick',

    /**
     * Promise 事件
     * @link https://developer.mozilla.org/zh-CN/docs/Web/API/Window/unhandledrejection_event
     */
    PROMISE = 'unhandledrejection',

    /**
     * WindowEventHandlers.onpopstate 事件
     * https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event
     */
    POPSTATE = 'popstate',

    /**
     *
     */
    READYSTATECHANGE = 'readystatechange'
}