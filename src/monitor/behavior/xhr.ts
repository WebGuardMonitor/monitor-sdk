import { MonitorImplements, WINDOW, XhrRequest } from '../../types';
import { constructReportData } from '../../helper/BasicData';
import { HTTP_TYPE } from '../../common';

/**
 * xhr 监控
 */
export class XhrMonitor implements MonitorImplements {
    initialize() {
        // 保存原始的 XMLHttpRequest 构造函数
        const OriginalXMLHttpRequest = window.XMLHttpRequest;

        // 定义一个自定义的 XMLHttpRequest 构造函数
        function CustomXMLHttpRequest(this: XMLHttpRequest): XMLHttpRequest {
            // 创建一个原始 XMLHttpRequest 实例
            const xhr = new OriginalXMLHttpRequest();

            // 保存原始的 open 和 send 方法
            const originalOpen = xhr.open;
            const originalHeader = xhr.setRequestHeader;
            const originalSend = xhr.send;

            const request: XhrRequest = {
                method: '',
                url: '',
                header: {},
                startTime: 0,
                duration: 0,
            };

            // 重写 open 方法

            xhr.open = function (
                method: string,
                url: string | URL,
                async: boolean = true,
                username?: string | null,
                password?: string | null,
            ): void {
                request.method = method;
                request.url = url;
                request.startTime = Date.now();
                request.async = async;
                request.username = username;
                request.password = password;

                originalOpen.apply(xhr, arguments as any); // 使用 apply 调用原始方法并传入参数
            };

            xhr.setRequestHeader = function (header: string, value: string) {
                request.header[header] = value;
                originalHeader.apply(xhr, arguments as any);
            };

            // 重写 send 方法
            xhr.send = function (): void {
                // 使用 apply 调用原始方法并传入参数
                originalSend.apply(xhr, arguments as any);
            };

            // 监听 loadend 事件
            xhr.addEventListener('loadend', async () => {
                const timestamp = Date.now();

                const responseHeader = xhr
                    .getAllResponseHeaders()
                    .split('\r\n')
                    .filter((item) => item !== '' && item != null)
                    .reduce((acc, item) => {
                        const [key, value] = item.split(': ');
                        // @ts-ignore
                        acc[key] = value;
                        return acc;
                    }, {});

                // const timing = performance.getEntriesByName(request.url.toString())?.[0] as PerformanceResourceTiming;

                const performanceTiming = await new Promise<PerformanceResourceTiming>((resolve) => {
                    const observer = new PerformanceObserver((list) => {
                        const entries = list.getEntriesByName(request.url.toString());
                        if (entries.length > 0) {
                            resolve(entries[0] as PerformanceResourceTiming);
                            observer.disconnect();
                        }
                    });

                    observer.observe({ type: 'resource', buffered: true });
                });

                const data = {
                    api: 'xhr',
                    request: {
                        url: request.url,
                        method: request.method,
                        headers: request.header,
                        timestamp: request.startTime,
                    },
                    response: {
                        status: xhr.status,
                        timing: performanceTiming,
                        timestamp: timestamp,
                        headers: responseHeader,
                    },
                    duration: performanceTiming?.duration.toFixed(2) || timestamp - request.startTime,
                };

                WINDOW.Sender.push(constructReportData(HTTP_TYPE, data));
            });

            // 确保返回正确的实例
            return xhr;
        }

        // 设置自定义构造函数的原型为原始构造函数的原型
        CustomXMLHttpRequest.prototype = OriginalXMLHttpRequest.prototype;

        // 替换全局 XMLHttpRequest
        (window as any).XMLHttpRequest = CustomXMLHttpRequest as unknown as typeof XMLHttpRequest;
    }
}
