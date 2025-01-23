import {MonitorImplements, WINDOW} from "../../types";
import {constructReportData} from "../../helper/BasicData";
import {PROMISE_TYPE} from "../../common";
import {bindReporter} from "../../helper/bindReporter";

/**
 * Promise 错误监控
 */
export class PromiseErrorMonitor implements MonitorImplements {
    initialize() {
        WINDOW.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {

            if (event.type === 'unhandledrejection') {

                bindReporter(constructReportData(PROMISE_TYPE, {
                    event,
                    message: event.reason instanceof ReferenceError || event.reason instanceof TypeError ? event.reason?.message : event.reason,
                    stack: event.reason instanceof ReferenceError || event.reason instanceof TypeError && event.reason?.stack?.split('\n') || []
                }))
            }

        }, true)
    }
}
