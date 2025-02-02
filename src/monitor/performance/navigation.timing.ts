import { whenLoad } from '../../helper/whenLoad';
import { getNavigationEntry } from '../../helper/getNavigationEntry';
import { getDefaultPerformance } from '../../utils';
import { MonitorImplements } from '../../types';
import { bindReporter } from '../../helper/bindReporter';
import { constructReportData } from '../../helper/BasicData';
import { NAVIGATION_TIMING_TYPE } from '../../common';

/**
 * 获取站点所用的时间线
 */
export class NavigationTimingMonitor implements MonitorImplements {
    initialize() {
        whenLoad(() => {
            setTimeout(() => {
                Promise.resolve().then(() => {
                    let data;

                    if (!!performance.getEntriesByType('navigation')[0]) {
                        data = this.NavigationTimingV2();
                    } else {
                        data = this.NavigationTimingV1();
                    }

                    bindReporter(constructReportData(NAVIGATION_TIMING_TYPE, data));
                });
            }, 0);
        });
    }

    /**
     * 根据新级别的 Performance Timing 获取时间线
     */
    NavigationTimingV2() {
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
    NavigationTimingV1() {
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
        } = getDefaultPerformance()?.timing as PerformanceTiming;
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
}
