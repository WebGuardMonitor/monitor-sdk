export const enum BrowserEventTypes {
    PAGE_VIEW = 'page_view',
    USER_VIEW = 'user_view',
    HTTP = 'http',
    PERFORMANCE = 'performance',
    PERFORMANCE_TIMING = 'performance_timing',
    NAVIGATION_TIMING = 'navigation_timing',
    JS_ERROR = 'js_error',
    RESOURCE = 'resource',
    RESOURCE_ERROR = 'resource_error',
    PROMISE_ERROR = 'promise',
    STAY_TIME = 'stay_time',
    BREADCRUMB = 'breadcrumb',
    XHR = 'xhr',
    FETCH = 'fetch',
    BATCH = 'batch',
    CONSOLE = 'console'
}

export const enum BrowserBreadcrumbTypes {
    CLICK = 'UI.CLICK',
    DBL_CLICK = 'UI.DBLCLICK',
    ROUTE = 'Route',
    CONSOLE = 'Console',
    XHR = 'Xhr',
    FETCH = 'Fetch',
    CODE_ERROR = 'code_error',
    // 页面进入
    PAGE_ENTRY = 'page_entry',
    // 重新进入页面
    PAGE_RE_ENTRY = 'page_re_entry',
    // 关闭页面
    PAGE_EXIT = 'page_exit',
}

export const enum BrowserPerformanceEntry {
    FP = 'FP',
    FCP = 'FCP',
    LCP = 'LCP',
    FID = 'FID',
    CLS = 'CLS',
    TTFB = 'TTFB',
    INP = 'INP',
}

/**
 * PerformanceEntry.entryType
 * https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceEntry/entryType
 */
export const enum BrowserPerformanceMetric {
    FRAME = 'frame',
    NAVIGATION = 'navigation',
    MEASURE = 'measure',
    MARK = 'mark',
    PAINT = 'paint',
    FIRST_INPUT = 'first-input',
    // https://developer.mozilla.org/en-US/docs/Web/API/LayoutShift
    LAYOUT_SHIFT = 'layout-shift',
    // https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint
    LARGEST_CONTENTFUL_PAINT = 'largest-contentful-paint',
    // https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceLongTaskTiming
    LONGTASK = 'longtask',
    RESOURCE = 'resource',
}