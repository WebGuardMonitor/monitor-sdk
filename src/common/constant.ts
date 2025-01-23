export enum EventType {
    // js 错误
    JS_ERROR = 'js_error',
    // Promise 异常
    PROMISE_ERROR = 'promise_error',
    // 性能
    PERFORMANCE = 'performance',
}

export const PERFORMANCE_TIMING_EV_TYPE = 'performance_timing'

export const VITALS_FP = 'fp';
export const VITALS_FCP = 'fcp';
export const VITALS_FMP = 'fmp';
export const VITALS_LCP = 'lcp';
export const VITALS_FID = 'fid';
export const VITALS_SI = 'si';
export const VITALS_TBT = 'tbt';
export const VITALS_INP = 'inp';
export const VITALS_CLS = 'cls';
export const VITALS_TTI = 'tti';
export const VITALS_TTFB = 'ttfb';
export const VITALS_DCL = 'dcl';
export const VITALS_LOAD = 'load';
export const VITALS_FPS = 'fps';

export const COMPLETE = 'complete';

export const CLICK_EV_TYPE = 'click_event'
export const BATCH_TYPE = 'batch'
export const PROMISE_TYPE = 'promise_error'
export const RESOURCE_TYPE = 'resource'
export const JS_ERROR_TYPE = 'js_error'
export const RESOURCE_ERROR_TYPE = 'resource_error'