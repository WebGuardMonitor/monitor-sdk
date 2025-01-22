import {
    BATCH_TYPE,
    CLICK_EV_TYPE,
    PERFORMANCE_TIMING_EV_TYPE,
    VITALS_CLS,
    VITALS_FCP,
    VITALS_FID,
    VITALS_FP,
    VITALS_INP,
    VITALS_LCP,
    VITALS_TTFB
} from "../common";

export type EventType =
    | 'pv' | 'uv'
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