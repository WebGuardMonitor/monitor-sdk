import {Common} from "./common";

export interface PerformancePayload {
    // 指标名称
    name: string;
    // 指标数据
    value: number;
    /** 指标的相关信息 */
    extra?: {
        [key: string]: string
    }
}

export interface Performance {
    ev_type: string;
    payload: PerformancePayload
    common: Common
}