export interface Options {
    // 上报地址
    report: string;
    // 应用 ID
    appId: string;
    // 当前用户 ID
    userId?: string;
    // 会话 ID
    sessionId?: string;
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
