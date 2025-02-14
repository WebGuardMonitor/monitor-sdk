import {BaseMonitorPlugin} from "@/core/baseMonitorPlugin";
import {ClientTypes} from "@/types/clientTypes";
import {on} from "@/utils/addEventListener";
import {WINDOW} from "@/utils";
import {EventEnum} from "@/enum/EventEnum";
import {addBreadcrumbInBrowser} from "@/browser/utils";
import {BrowserBreadcrumbTypes, BrowserEventTypes} from "@/enum/BrowserEventTypes";
import {LEVEL, REPORT_NOW} from "@/enum/constant";
import {errorStackParser} from "@/helper/stack-trace";
import {generateTraceId} from "@/utils/traceId";
import {constructorReport} from "@/helper/constructorReport";
import {PromiseErrorPayload} from "@/types/sender.types";

export class PromiseMonitorPlugin extends BaseMonitorPlugin {
    initialize(client: ClientTypes) {
        on(WINDOW, EventEnum.PROMISE, (event: PromiseRejectionEvent) => {

            if (event.type == EventEnum.PROMISE) {

                const message = event.reason instanceof ReferenceError
                || event.reason instanceof TypeError
                || event.reason instanceof AggregateError
                || event.reason instanceof RangeError
                || event.reason instanceof SyntaxError
                || event.reason instanceof URIError
                || event.reason instanceof Error
                    ? event.reason?.message
                    : event.reason;

                const breadcrumb = addBreadcrumbInBrowser(client, {
                    error_action: EventEnum.PROMISE,
                    message
                }, BrowserBreadcrumbTypes.CODE_ERROR, LEVEL.ERROR)

                const virtualStackTrace = (event.reason && (
                    event.reason instanceof Error ||
                    event.reason instanceof EvalError ||
                    event.reason instanceof RangeError ||
                    event.reason instanceof ReferenceError ||
                    event.reason instanceof SyntaxError ||
                    event.reason instanceof TypeError ||
                    event.reason instanceof URIError
                ) ? event.reason.stack : '') as string;


                const data = {
                    message,
                    // 错误堆栈
                    stackTrace: errorStackParser(virtualStackTrace),

                    // 链路 ID
                    ...generateTraceId(EventEnum.PROMISE, {
                        message: message,
                    }),

                    // 行为栈
                    breadcrumbs: breadcrumb
                } as PromiseErrorPayload;

                client.sender.immediately(constructorReport(BrowserEventTypes.PROMISE_ERROR, data), REPORT_NOW)
            }
        })
    }
}