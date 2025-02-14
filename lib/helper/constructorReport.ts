import {EventType} from "@/types/evTypes";
import {
    ConsolePayload,
    HttpPayload,
    JsErrorPayload,
    NavigationTimingPayload,
    PagePayload,
    PerformancePayload,
    PerformanceTimingPayload,
    PromiseErrorPayload,
    ResourceErrorPayload, ResourcePayload,
    SenderTypes,
    StayTimePayload
} from "@/types/sender.types";
import {BrowserEventTypes} from "@/enum/BrowserEventTypes";
import {configManager} from "@/core/config";
import {isObject} from "radash";

type Payload = JsErrorPayload
    | ResourceErrorPayload
    | PromiseErrorPayload
    | HttpPayload
    | ConsolePayload
    | StayTimePayload
    | PagePayload
    | PerformanceResourceTiming
    | PerformanceTimingPayload
    | NavigationTimingPayload
    | PerformancePayload
    | ResourcePayload;

export const constructorReport = (evenType: EventType, payLoad: Payload): any => {
    return {
        ev_type: evenType,
        payload: payLoad,
        common: configManager.getReportConfig()
    }
};

/**
 * 构造批量发送上报数据结构
 * @param {SenderTypes} data 上报数据
 */
export const constructorBatchReport = (data: SenderTypes[]): any => {
    return {
        ev_type: BrowserEventTypes.BATCH,
        list: isObject(data) ? [data] : data,
    }
};