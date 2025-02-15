import {
    BATCH_TYPE,
    CLICK_EV_TYPE,
    FETCH_ERROR_TYPE,
    HTTP_TYPE,
    JS_ERROR_TYPE,
    NAVIGATION_TIMING_TYPE,
    PERFORMANCE_TIMING_EV_TYPE,
    PROMISE_TYPE,
    RESOURCE_ERROR_TYPE,
    RESOURCE_TYPE,
    STAY_TIME_TYPE,
    VITALS_CLS,
    VITALS_DCL,
    VITALS_FCP,
    VITALS_FID,
    VITALS_FP,
    VITALS_INP,
    VITALS_LCP,
    VITALS_LOAD,
    VITALS_TTFB,
} from '../common';

export type EventType =
    | 'pv'
    | 'uv'
    | typeof PERFORMANCE_TIMING_EV_TYPE
    | typeof CLICK_EV_TYPE
    | typeof BATCH_TYPE
    | typeof VITALS_FP
    | typeof VITALS_CLS
    | typeof VITALS_FCP
    | typeof VITALS_FID
    | typeof VITALS_INP
    | typeof VITALS_LCP
    | typeof VITALS_TTFB
    | typeof PROMISE_TYPE
    | typeof RESOURCE_TYPE
    | typeof JS_ERROR_TYPE
    | typeof RESOURCE_ERROR_TYPE
    | typeof HTTP_TYPE
    | typeof FETCH_ERROR_TYPE
    | typeof VITALS_LOAD
    | typeof VITALS_DCL
    | typeof NAVIGATION_TIMING_TYPE
    | typeof STAY_TIME_TYPE;
