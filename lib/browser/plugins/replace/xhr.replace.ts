import {BaseMonitorPlugin} from "@/core/baseMonitorPlugin";
import {ClientTypes} from "@/types/clientTypes";
import {WINDOW} from "@/utils";
import {XhrHttpRequestTypes} from "@/types/xhr.http.request.types";
import {BrowserBreadcrumbTypes, BrowserEventTypes} from "@/enum/BrowserEventTypes";
import {constructorReport} from "@/helper/constructorReport";
import {generateTraceId} from "@/utils/traceId";
import {addBreadcrumbInBrowser} from "@/browser/utils";
import {HttpPayload} from "@/types/sender.types";

type WindowWithXhr = Window & { XMLHttpRequest?: typeof XMLHttpRequest };

type XhrConstructorArgs = ConstructorParameters<typeof XMLHttpRequest>;

type XhrHeader = Record<string, string>;

export class XhrMonitorPlugin extends BaseMonitorPlugin {
    private originalXHR?: typeof XMLHttpRequest;

    initialize(client: ClientTypes) {
        if (!('XMLHttpRequest' in WINDOW)) return;

        this.originalXHR = (WINDOW as WindowWithXhr).XMLHttpRequest;
        this.instrumentXHR(client);

    }

    /**
     * 劫持 XMLHttpRequest
     * @param client
     * @private
     */
    private instrumentXHR(client: ClientTypes) {
        const OriginalXMLHttpRequest = this.originalXHR!;

        window.XMLHttpRequest = new Proxy(this.originalXHR!, {
            construct: (target: typeof OriginalXMLHttpRequest, args: any[]) => {

                const xhr = new target(...(args as ConstructorParameters<typeof OriginalXMLHttpRequest>));

                const request: XhrHttpRequestTypes = {
                    method: '',
                    url: '',
                    headers: {},
                    start_time: 0,
                    end_time: 0,
                    duration: 0
                };

                // 劫持 open 方法
                this.instrumentXhrOpen(xhr, request);

                // 劫持 setRequestHeader 方法
                this.instrumentXhrHeader(xhr, request);

                // 劫持 send 方法
                this.instrumentXhrSend(xhr, request);

                // 拦截 onreadystatechange 事件，监控请求状态
                const originalOnReadyStateChange = xhr.onreadystatechange;
                xhr.onreadystatechange = async function () {
                    if (this.readyState === xhr.DONE) {

                        const responseStatus = this.status;
                        const responseData = this.responseText;

                        const performanceTiming = await new Promise<PerformanceResourceTiming>((resolve) => {
                            const observer = new PerformanceObserver((list) => {
                                const entries = list.getEntriesByName(request.url.toString());
                                if (entries.length > 0) {
                                    resolve(entries[0] as PerformanceResourceTiming);
                                    observer.disconnect();
                                }
                            });

                            observer.observe({type: 'resource', buffered: true});
                        });

                        // 响应 header 内容
                        const responseHeaders = Reflect.construct(XhrMonitorPlugin, [client]).parseResponseHeaders(xhr)

                        const behaviorData = {
                            api: BrowserEventTypes.XHR,
                            request: {
                                method: request.method,
                                url: request.url.toString(),
                                timestamp: request.start_time,
                                headers: request.headers
                            }
                        };

                        const duration = Number(performanceTiming.duration.toFixed(2)) || 0;

                        const breadcrumb = addBreadcrumbInBrowser(
                            client,
                            behaviorData,
                            BrowserBreadcrumbTypes.XHR
                        );

                        const handlerData = {
                            ...behaviorData,

                            response: {
                                status: responseStatus,
                                headers: responseHeaders,
                                body: responseData,
                                timestamp: Date.now(),
                                timing: performanceTiming
                            },

                            duration: duration,

                            ...generateTraceId(BrowserEventTypes.XHR, {
                                method: request.method,
                                url: request.url,
                                headers: request,
                                status: responseStatus,
                                statusText: this.responseText,
                                duration: duration
                            }),

                            breadcrumbs: breadcrumb
                        } as HttpPayload;

                        client.sender.immediately(constructorReport(BrowserEventTypes.HTTP, handlerData))

                    }

                    if (originalOnReadyStateChange) {
                        originalOnReadyStateChange.call(this);
                    }
                };

                return xhr;
            }
        });
    }

    /**
     * 劫持 open 方法
     * @param xhr
     * @param request
     * @private
     */
    private instrumentXhrOpen(xhr: XMLHttpRequest, request: XhrHttpRequestTypes) {
        const originalOpen = xhr.open.bind(xhr);
        xhr.open = function (
            method: string,
            url: string | URL,
            async: boolean = true,
            username?: string | null,
            password?: string | null
        ) {
            request.method = method;
            request.url = url;
            request.start_time = Date.now();
            return originalOpen.apply(this, arguments);
        };
    }

    /**
     * 劫持 setRequestHeader 方法
     * @param xhr
     * @param request
     * @private
     */
    private instrumentXhrHeader(xhr: XMLHttpRequest, request: XhrHttpRequestTypes) {
        const originalSetRequestHeader = xhr.setRequestHeader.bind(xhr);
        xhr.setRequestHeader = function (name: string, value: string) {
            request['headers'][name] = value;
            originalSetRequestHeader.apply(this, arguments);
        }
    }

    /**
     * 劫持 send 方法
     * @param xhr
     * @param request
     * @private
     */
    private instrumentXhrSend(xhr: XMLHttpRequest, request: XhrHttpRequestTypes) {
        const originalSend = xhr.send.bind(xhr);
        xhr.send = (data?: Document | BodyInit | null) => {
            return originalSend.call(this, data);
        };
    }

    /**
     * 解析响应头
     * @param xhr
     * @private
     */
    private parseResponseHeaders(xhr: XMLHttpRequest): XhrHeader {
        return xhr.getAllResponseHeaders()
            .trim()
            .split(/[\r\n]+/)
            .reduce((acc: XhrHeader, line) => {
                const parts = line.split(': ');
                const header = parts.shift() || '' as string;

                acc[header] = parts.join(': ');
                return acc;
            }, {});
    }


    private sendReport(client: ClientTypes, data: any) {
        const report = constructorReport(BrowserEventTypes.HTTP, data);
        client.sender.immediately(report);
    }

}
