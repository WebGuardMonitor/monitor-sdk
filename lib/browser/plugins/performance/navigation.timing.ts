import {ClientTypes} from "@/types/clientTypes";
import {constructorReport} from "@/helper/constructorReport";
import {BrowserEventTypes} from "@/enum/BrowserEventTypes";
import {getNavigationEntry} from "@/helper/getNavigationEntry";
import {WINDOW} from "@/utils";
import {NavigationTimingPayload} from "@/types/sender.types";

/**
 * 获取 Navigation Timing 数据
 * @param client
 * @link https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming 傻缺中文文档没有解释，英文官网却有。
 */
export const getNavigationTimingMonitor = (client: ClientTypes) => {
    setTimeout(() => {
        Promise.resolve().then(() => {
            let data;

            if (!!performance.getEntriesByType('navigation')[0]) {
                data = getNavigationTimingV2();
            } else {
                data = getNavigationTimingV1();
            }

            client.sender.immediately(constructorReport(BrowserEventTypes.NAVIGATION_TIMING, data));
        });
    }, 0);
}


/**
 * 根据新级别的 Performance Timing 获取时间线
 */
export const getNavigationTimingV2 = (): NavigationTimingPayload => {
    const {
        domainLookupEnd,
        domainLookupStart,
        connectStart,
        secureConnectionStart,
        connectEnd,
        requestStart,
        responseStart,
        responseEnd,
        domInteractive,
        domContentLoadedEventEnd,
        loadEventStart,
    } = getNavigationEntry();

    return {
        dns: domainLookupEnd - domainLookupStart,
        tcp: connectEnd - connectStart,
        ssl: secureConnectionStart === 0 ? 0 : connectEnd - secureConnectionStart,
        request: responseStart - requestStart,
        transmission: responseEnd - responseStart,
        dom: domInteractive - responseEnd,
        resource: loadEventStart - domContentLoadedEventEnd,
    };
}

/**
 * 根据旧的 Performance Timing 获取时间线
 */
export const getNavigationTimingV1 = (): NavigationTimingPayload => {
    const {
        domainLookupEnd,
        domainLookupStart,
        connectStart,
        secureConnectionStart,
        connectEnd,
        requestStart,
        responseStart,
        responseEnd,
        domInteractive,
        domContentLoadedEventEnd,
        loadEventStart,
    } = WINDOW.performance?.timing as PerformanceTiming;
    
    return {
        dns: domainLookupEnd - domainLookupStart,
        tcp: connectEnd - connectStart,
        ssl: secureConnectionStart === 0 ? 0 : connectEnd - secureConnectionStart,
        request: responseStart - requestStart,
        transmission: responseEnd - responseStart,
        dom: domInteractive - responseEnd,
        resource: loadEventStart - domContentLoadedEventEnd,
    };
}