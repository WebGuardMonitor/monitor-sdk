export interface Options {
    // 上报地址
    report: string;
    // 应用 ID
    appId: string;
    // 当前用户 ID
    userId?: string;
    // 会话 ID
    sessionId?: string;
    // 是否开启 PV 上报
    isPageView: boolean,
    // 是否开启 UV 上报
    isUniqueVisitor: boolean,
    // 是否启动 performance 指标上报
    isPerformance: boolean,
    // 是否开启网站性能指标数据上报
    isWebVitals: boolean,
    // 是否开启 Promise 错误上报
    isPromiseError: boolean,
    // 是否开启点击事件上报
    isClickEvent: boolean,
    // 是否开启屏幕录制
    isRecord: boolean
}

export interface DefaultOption {
    REPORT_PV: string;
    REPORT_UV: string;
}

export interface ConfigOptionType extends Options, DefaultOption {
}

export interface MethodOptions {
    url: string;
    data: any;
}
