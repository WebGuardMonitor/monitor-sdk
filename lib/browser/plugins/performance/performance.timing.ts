import {BaseMonitorPlugin} from "@/core/baseMonitorPlugin";
import {ClientTypes} from "@/types/clientTypes";
import {
    CLSThresholds,
    FCPThresholds,
    FIDThresholds,
    INPThresholds,
    LCPThresholds,
    Metric,
    onCLS,
    onFCP,
    onFID,
    onINP,
    onLCP,
    onTTFB,
    TTFBThresholds
} from "web-vitals";
import {getNavigationEntry} from "@/helper/getNavigationEntry";
import {constructorReport} from "@/helper/constructorReport";
import {BrowserEventTypes, BrowserPerformanceEntry} from "@/enum/BrowserEventTypes";
import {generateTraceId} from "@/utils/traceId";
import {FPThresholds, onFP} from "@/browser/plugins/performance/web-vitals/onFP";
import {onLoad} from "@/helper/onLoad";
import {getNavigationTimingMonitor} from "@/browser/plugins/performance/navigation.timing";
import {PerformancePayload, PerformanceTimingPayload} from "@/types/sender.types";

export class PerformanceTimingMonitorPlugin extends BaseMonitorPlugin {
    private client = {} as ClientTypes;

    initialize(client: ClientTypes) {
        this.client = client;
        // 获取新老 Performance 接口对应数据
        onLoad(() => {
            this.getPerformanceTiming();
            getNavigationTimingMonitor(client)
        })

        onFP(entry => this.handlePerformanceEntry(entry, BrowserPerformanceEntry.FP, FPThresholds));
        onFCP(entry => this.handlePerformanceEntry(entry, BrowserPerformanceEntry.FCP, FCPThresholds))
        // FMP
        onLCP(entry => this.handlePerformanceEntry(entry, BrowserPerformanceEntry.LCP, LCPThresholds))
        onFID(entry => this.handlePerformanceEntry(entry, BrowserPerformanceEntry.FID, FIDThresholds))
        onCLS(entry => this.handlePerformanceEntry(entry, BrowserPerformanceEntry.CLS, CLSThresholds))

        // TTi
        // TTi()

        onTTFB(entry => this.handlePerformanceEntry(entry, BrowserPerformanceEntry.TTFB, TTFBThresholds))
        onINP(entry => this.handlePerformanceEntry(entry, BrowserPerformanceEntry.INP, INPThresholds))
    }

    /**
     * 获取时间轴
     */
    getPerformanceTiming() {
        const timing = (performance && performance.timing) || undefined;
        const navigation = getNavigationEntry();

        const data = {
            timing: timing,
            navigation_timing: navigation,
            ...generateTraceId(BrowserEventTypes.PERFORMANCE_TIMING)
        } as PerformanceTimingPayload;

        this.client.sender.immediately(constructorReport(BrowserEventTypes.PERFORMANCE_TIMING, data))
    }

    /**
     * 处理性能指标
     * @param entry
     * @param name
     * @param thresholds
     */
    handlePerformanceEntry(entry: Metric, name: BrowserPerformanceEntry, thresholds?: number[]) {
        const data = {
            name: name,
            value: entry.value,
            thresholds: thresholds || [0, 0],
            ...generateTraceId(BrowserEventTypes.PERFORMANCE_TIMING)
        } as PerformancePayload;

        this.client.sender.immediately(constructorReport(BrowserEventTypes.PERFORMANCE, data))
    }

}