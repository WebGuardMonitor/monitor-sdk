import {MonitorImplements, WINDOW} from "../../types";
import {buildTraceId} from "../../utils";
import ErrorStackParser from "error-stack-parser";
import {constructReportData} from "../../helper/BasicData";
import {JS_ERROR_TYPE, RESOURCE_ERROR_TYPE} from "../../common";

interface ErrorInterface extends ErrorEvent {
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

/**
 * js 错误上报
 */
export class JsErrorMonitor implements MonitorImplements {
    initialize() {

        // https://juejin.cn/post/6862559324632252430#heading-9

        WINDOW.addEventListener('error', (event: ErrorEvent) => {
            // console.log(event)

            const errorEvent = event as ErrorInterface;

            // 是否资源加载错误
            if (
                errorEvent.target &&
                errorEvent.target.localName &&
                staticTypes.includes((errorEvent.target.localName).toLowerCase())
            ) {

                const resource_data = {
                    tag: errorEvent.target.nodeName?.toLowerCase(),
                    src: errorEvent.target.nodeName?.toLowerCase() === 'link' ? errorEvent.target.href : errorEvent.target.src,
                    outerHTML: errorEvent.target.outerHTML,
                    href: errorEvent.target.baseURI,
                    traceId: buildTraceId([
                        (errorEvent.type),
                        errorEvent.target.src
                    ].join('|'))
                }

                WINDOW.Sender.push(constructReportData(RESOURCE_ERROR_TYPE, resource_data))

            } else {
                const data = {
                    // 错误类型
                    type: event.error && event.error.name,
                    // 错误信息
                    message: event.message,

                    // 错误详情
                    meta: {
                        // 错误文件
                        filename: event.filename,
                        // 错误行
                        row: event.lineno,
                        // 错误列
                        columns: event.colno
                    },

                    // 错误 ID
                    ...buildTraceId([
                        (event.error && event.error.name),
                        event.message,
                        event.filename,
                    ].join('|')),

                    // 错误堆栈
                    stackTrace: ErrorStackParser.parse(event.error)
                };

                console.log(event.error)
                WINDOW.Sender.push(constructReportData(JS_ERROR_TYPE, data))
            }

        }, true)
    }
}
