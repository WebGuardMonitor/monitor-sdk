import {BATCH_TYPE, CLICK_EV_TYPE, PERFORMANCE_TIMING_EV_TYPE} from "../common";

export type EventType =
    | 'pv' | 'uv'
    | typeof PERFORMANCE_TIMING_EV_TYPE
    | typeof CLICK_EV_TYPE
    | typeof BATCH_TYPE
