import {BrowserEventTypes} from "@/enum/BrowserEventTypes";
import {BreadcrumbTypes} from "@/types/breadcrumbTypes";
import {ReportConfigTypes} from "@/types/config.types";
import {ConsoleLevel} from "@/types/instrument";

/**
 * 发送数据类型
 */
export interface SenderTypes {
    ev_type: BrowserEventTypes;
    payload: object;
    common: ReportConfigTypes;
}

// 批量发送上报数据类型
export interface BatchSenderTypes {
    ev_type: BrowserEventTypes.BATCH;
    list: SenderTypes[];
}

// 资源错误上报数据类型
export interface ResourceErrorPayload {
    tag: string;
    src: string;
    outerHTML: string;
    href: string;
    traceId: string;
    timing?: PerformanceResourceTiming
}

// js 错误上报数据类型
export interface JsErrorPayload {
    type: string;
    message: string;
    meta: {
        filename: string;
        row: number;
        columns: number;
    };
    stackTrace: object;
    traceId: string;
    breadcrumbs: BreadcrumbTypes[]
}

// Promise 错误上报数据类型
export interface PromiseErrorPayload {
    message: string;
    traceId: string;
    stackTrace: object;
    breadcrumbs: BreadcrumbTypes[]
}

// Fetch and Xhr 上报数据类型
export interface HttpPayload {
    api: string;
    request: {
        method: string;
        url: string;
        timestamp: number;
        headers: object;
    },
    response?: {
        status: number;
        headers: object;
        timestamp: number;
        timing?: PerformanceResourceTiming,
        body?: string;
    },
    // 错误类型
    type?: string;
    // 错误信息
    message?: string;
    // 错误堆栈
    stackTrace?: object;
    // 错误时间栈
    timing?: PerformanceResourceTiming;
    duration: number;
    traceId: string;
    breadcrumbs: BreadcrumbTypes[]
}

// console 上报数据类型
export interface ConsolePayload {
    types: ConsoleLevel,
    params: {
        [index: number]: string
    },
    traceId: string;
    breadcrumbs: BreadcrumbTypes[]
}

// 页面停留时长上报数据类型
export interface StayTimePayload {
    start_time: number;
    end_time: number;
    duration: number;
    href: string;
    breadcrumbs: BreadcrumbTypes[]
}

// PV UV 上报数据类型
export interface PagePayload {
    page_id: string;
    source: string;
}

// 性能时间线上报数据类型
export interface PerformanceTimingPayload {
    timing?: PerformanceTiming;
    navigation_timing?: PerformanceNavigationTiming;
    traceId: string
}

// 性能上报数据类型
export interface PerformancePayload {
    /** 指标名称 */
    name: string
    /** 当前值 */
    value: number
    /** 性能指标类型， perf => 传统性能, spa => SPA 性能 */
    type: string,
    // 阈值
    thresholds?: number[],
    traceId: string
}

// 页面加载时间线上报数据类型
export interface NavigationTimingPayload {
    dns: number,
    tcp: number,
    ssl: number,
    request: number,
    transmission: number,
    dom: number,
    resource: number,
}

// 资源数据上报
export interface ResourcePayload extends PerformanceResourceTiming {
    traceId: string;
}