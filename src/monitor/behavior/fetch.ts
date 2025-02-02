import { MonitorImplements, WINDOW } from '../../types';
import { constructReportData } from '../../helper/BasicData';
import { FETCH_ERROR_TYPE, HTTP_TYPE } from '../../common';
import { buildTraceId } from '../../utils';
import ErrorStackParser from 'error-stack-parser';
import { bindReporter } from '../../helper/bindReporter';

/**
 * fetch 监控
 */
export class FetchMonitor implements MonitorImplements {
    initialize() {
        const originalFetch = window.fetch;

        (window as any).fetch = async function (input: RequestInfo, init?: RequestInit): Promise<Response> {
            const request = {
                url: typeof input === 'string' ? input : input.url,
                method: init?.method || 'GET',
                headers: init?.headers || {},
            };

            try {
                const response = await originalFetch(input, init);

                const timestamp = Date.now();

                const performanceTiming = await new Promise<PerformanceResourceTiming>((resolve) => {
                    const observer = new PerformanceObserver((list) => {
                        const entries = list.getEntriesByName(request.url);
                        if (entries.length > 0) {
                            resolve(entries[0] as PerformanceResourceTiming);
                            observer.disconnect();
                        }
                    });

                    observer.observe({ type: 'resource', buffered: true });
                });

                // 获取响应的 header
                const headers = response.headers;
                const responseHeader: { [key: string]: string } = {};
                headers.forEach((value, key) => {
                    responseHeader[key] = value;
                });

                if (response.ok) {
                    const data = {
                        api: 'fetch',
                        request: {
                            method: request.method,
                            url: request.url,
                            timestamp: timestamp,
                            headers: request.headers,
                        },
                        response: {
                            status: response.status,
                            headers: responseHeader,
                            timestamp: Date.now(),
                            timing: performanceTiming,
                        },
                        duration: performanceTiming?.duration.toFixed(2),
                    };

                    WINDOW.Sender.push(constructReportData(HTTP_TYPE, data));
                } else {
                    const data = {
                        api: 'fetch',
                        request: {
                            method: request.method,
                            url: request.url,
                            timestamp: timestamp,
                            headers: request.headers,
                        },
                        response: {
                            status: response.status,
                            headers: responseHeader,
                            timestamp: Date.now(),
                            timing: performanceTiming,
                        },
                        duration: performanceTiming?.duration.toFixed(2),
                    };

                    bindReporter(constructReportData(FETCH_ERROR_TYPE, data));
                }

                return response;
            } catch (error: any) {
                // 捕获 fetch 抛出的异常
                const data = {
                    // 请求信息
                    request: {
                        method: request.method,
                        url: request.url,
                        timestamp: Date.now(),
                        headers: request.headers,
                    },

                    // 错误类型
                    type: error?.name,

                    // 错误信息
                    message: error?.message,

                    // 资源时长
                    timing: performance.getEntriesByName(request.url)[0] as PerformanceResourceTiming,

                    // 错误 ID
                    ...buildTraceId([error?.message, error?.name, request.url, request.method].join('|')),

                    // 错误堆栈
                    stackTrace: ErrorStackParser.parse(error),
                };

                bindReporter(constructReportData(FETCH_ERROR_TYPE, data));

                // 继续抛出错误以保持 fetch 行为的一致性
                throw error;
            }
        };
    }
}
