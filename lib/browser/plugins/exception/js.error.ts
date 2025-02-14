import {BaseMonitorPlugin} from "@/core/baseMonitorPlugin";
import {ClientTypes} from "@/types/clientTypes";
import {WINDOW} from "@/utils";
import {on} from "@/utils/addEventListener";
import {EventEnum} from "@/enum/EventEnum";
import {errorStackParser} from "@/helper/stack-trace";
import {generateTraceId} from "@/utils/traceId";
import {BrowserBreadcrumbTypes, BrowserEventTypes} from "@/enum/BrowserEventTypes";
import {constructorReport} from "@/helper/constructorReport";
import {LEVEL, REPORT_NOW} from "@/enum/constant";
import {addBreadcrumbInBrowser} from "@/browser/utils";
import {JsErrorPayload, ResourceErrorPayload} from "@/types/sender.types";

interface ErrorEventInterface extends ErrorEvent {
    target: EventTarget & {
        localName?: string;
        tagName?: string;
        src?: string;
        outerHTML?: string;
        href?: string;
        nodeName?: string;
        baseURI?: string;
    };
}

const staticTypes = ['img', 'img', 'audio', 'link', 'script', 'video', 'source'];

// 错误类型具体可前往 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error


export class JsErrorMonitorPlugin extends BaseMonitorPlugin {
    initialize(client: ClientTypes) {

        // https://juejin.cn/post/6862559324632252430#heading-9

        on(WINDOW, EventEnum.ERROR, (event: ErrorEvent) => {

            const errorEvent = event as ErrorEventInterface;

            if (
                errorEvent.target &&
                errorEvent.target.localName &&
                staticTypes.includes(errorEvent.target.localName.toLowerCase())
            ) {
                const resource_data = {
                    tag: errorEvent.target.nodeName?.toLowerCase() as string,
                    src:
                        (errorEvent.target.nodeName?.toLowerCase() === 'link'
                            ? errorEvent.target.href
                            : errorEvent.target.src) as string,
                    outerHTML: errorEvent.target.outerHTML as string,
                    href: errorEvent.target.baseURI as string,

                    ...generateTraceId(BrowserEventTypes.RESOURCE_ERROR, {
                        tag: errorEvent.target.nodeName?.toLowerCase(),
                        src: errorEvent.target.nodeName?.toLowerCase() === 'link'
                            ? errorEvent.target.href
                            : errorEvent.target.src,
                    })
                } as ResourceErrorPayload;

                client.sender.immediately(constructorReport(BrowserEventTypes.RESOURCE_ERROR, resource_data), REPORT_NOW);

            } else {
                setTimeout(() => {
                    const virtualStackTrace = (event.error && (
                        event.error instanceof Error ||
                        event.error instanceof EvalError ||
                        event.error instanceof RangeError ||
                        event.error instanceof ReferenceError ||
                        event.error instanceof SyntaxError ||
                        event.error instanceof TypeError ||
                        event.error instanceof URIError
                    ) ? event.error.stack : '') as string;

                    const message = event.message;

                    const meta = {
                        // 错误文件
                        filename: event.filename,
                        // 错误行
                        row: event.lineno,
                        // 错误列
                        columns: event.colno,
                    }

                    const breadcrumb = addBreadcrumbInBrowser(client, {
                        message,
                        meta,
                    }, BrowserBreadcrumbTypes.CODE_ERROR, LEVEL.ERROR)


                    const data = {
                        // 错误类型
                        type: event.error && event.error.name,
                        // 错误信息
                        message: message,
                        // 错误详情
                        meta: meta,

                        // 错误堆栈
                        stackTrace: virtualStackTrace ? errorStackParser(virtualStackTrace) : {},

                        // 链路 ID
                        ...generateTraceId(EventEnum.ERROR, {
                            type: event.error && event.error.name,
                            message: message,
                            filename: event.filename,
                            row: event.lineno,
                            columns: event.colno
                        }),

                        // 行为栈
                        breadcrumbs: breadcrumb
                    } as JsErrorPayload;

                    client.sender.immediately(constructorReport(BrowserEventTypes.JS_ERROR, data), REPORT_NOW)
                }, 0)
            }

        }, true)
    }
}
