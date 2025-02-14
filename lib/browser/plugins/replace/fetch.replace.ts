import {BaseMonitorPlugin} from "@/core/baseMonitorPlugin";
import {ClientTypes} from "@/types/clientTypes";
import {WINDOW} from "@/utils";
import {addBreadcrumbInBrowser} from "@/browser/utils";
import {BrowserBreadcrumbTypes, BrowserEventTypes} from "@/enum/BrowserEventTypes";
import {constructorReport} from "@/helper/constructorReport";
import {LEVEL, REPORT_NOW} from "@/enum/constant";
import {generateTraceId} from "@/utils/traceId";
import {BreadcrumbTypes} from "@/types/breadcrumbTypes";
import {HttpPayload} from "@/types/sender.types";

export class FetchMonitorPlugin extends BaseMonitorPlugin {
    initialize(client: ClientTypes) {
        const originalFetch = window.fetch;
        WINDOW.fetch = async function (input: RequestInfo, init?: RequestInit): Promise<Response> {
            const request = {
                url: typeof input === 'string' ? input : input.url,
                method: init?.method || 'GET',
                headers: init?.headers || {},
            };

            try {
                const response = await originalFetch(input, init)

                const timestamp = Date.now();

                const performanceTiming = await new Promise<PerformanceResourceTiming>((resolve) => {
                    const observer = new PerformanceObserver((list) => {
                        const entries = list.getEntriesByName(request.url);
                        if (entries.length > 0) {
                            resolve(entries[0] as PerformanceResourceTiming);
                            observer.disconnect();
                        }
                    });

                    observer.observe({type: 'resource', buffered: true});
                });

                // 获取响应的 header
                const headers = response.headers;
                const responseHeader: { [key: string]: string } = {};
                headers.forEach((value, key) => {
                    responseHeader[key] = value;
                });

                const duration = performanceTiming.duration;

                const traceParams = {
                    method: request.method,
                    url: request.url,
                    headers: request,
                    status: response.status,
                    statusText: response.statusText,
                    duration: duration
                }

                const {traceId} = generateTraceId(BrowserEventTypes.FETCH, traceParams)

                let breadcrumb: BreadcrumbTypes[];

                if (response.ok) {
                    breadcrumb = addBreadcrumbInBrowser(client, traceParams, BrowserBreadcrumbTypes.FETCH)

                    const successData = {
                        api: BrowserEventTypes.FETCH,
                        request: {
                            method: request.method,
                            url: request.url,
                            timestamp: timestamp,
                            headers: request.headers
                        },
                        response: {
                            status: response.status,
                            headers: responseHeader,
                            timestamp: Date.now(),
                            timing: performanceTiming
                        },
                        duration: Number(duration) || 0,
                        traceId: traceId,
                        breadcrumbs: breadcrumb
                    } as HttpPayload;

                    client.sender.immediately(constructorReport(BrowserEventTypes.HTTP, successData))

                } else {

                    breadcrumb = addBreadcrumbInBrowser(client, traceParams, BrowserBreadcrumbTypes.FETCH, LEVEL.ERROR)

                    const errorData = {
                        api: BrowserEventTypes.FETCH,
                        request: {
                            method: request.method,
                            url: request.url,
                            timestamp: timestamp,
                            headers: request.headers
                        },
                        response: {
                            status: response.status,
                            headers: responseHeader,
                            timestamp: Date.now(),
                            timing: performanceTiming
                        },
                        duration: Number(performanceTiming.duration.toFixed(2)) || 0,
                        traceId: traceId,
                        breadcrumbs: breadcrumb
                    } as HttpPayload;

                    client.sender.immediately(constructorReport(BrowserEventTypes.HTTP, errorData), REPORT_NOW)

                }

                return response;
            } catch (error: any) {
                const errorType = error?.name || '';
                const errorMessage = error?.message || '';

                const breadcrumb = addBreadcrumbInBrowser(client, {
                    method: request.method,
                    url: request.url,
                    headers: request,
                    type: errorType,
                    message: errorMessage
                }, BrowserBreadcrumbTypes.FETCH, LEVEL.ERROR)

                const performanceTiming = performance.getEntriesByName(request.url)[0] as PerformanceResourceTiming;

                const errorData = {
                    api: BrowserEventTypes.FETCH,
                    request: {
                        method: request.method,
                        url: request.url,
                        timestamp: Date.now(),
                        headers: request.headers
                    },
                    // 错误类型
                    type: error?.name,

                    // 错误信息
                    message: errorMessage,

                    // 资源时长
                    timing: performanceTiming,

                    duration: Number(performanceTiming.duration.toFixed(2)) || 0,

                    ...generateTraceId(BrowserEventTypes.FETCH, {
                        method: request.method,
                        url: request.url,
                        headers: request,
                        status: 0,
                        statusText: '',
                        duration: 0
                    }),

                    // 行为堆栈
                    breadcrumbs: breadcrumb
                } as HttpPayload;

                client.sender.immediately(constructorReport(BrowserEventTypes.HTTP, errorData), REPORT_NOW)

                // 继续抛出错误以保持 fetch 行为的一致性
                throw error;
            }

        }

    }
}