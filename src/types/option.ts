import {MethodType} from "./method";

export interface Options {
    // 上报地址
    report: string;
    // 应用 ID
    appId: string;
    // 当前用户 ID
    userId?: string;
}

export interface DefaultOption {
    REPORT_PV: string
}

export interface ConfigOptionType extends Options, DefaultOption {
}

export interface MethodOptions {
    method: MethodType;
    url: string;
    data: Object;
}