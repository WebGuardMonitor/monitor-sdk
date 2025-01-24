import {getNavigationEntry} from "../../../helper/getNavigationEntry";
import {whenLoad} from "../../../helper/whenLoad";
import {WINDOW} from "../../../types";
import {constructReportData} from "../../../helper/BasicData";
import {VITALS_LOAD} from "../../../common";

// https://juejin.cn/post/7218513153402224695#heading-5

/**
 * 初始化加载时间
 */
export const initLoad = () => {
    whenLoad(() => {
        let value: number;
        let entries;
        if (performance.getEntriesByType('navigation').length >= 1) {
            const newPerformanceTiming = getNavigationEntry()
            entries = newPerformanceTiming as PerformancePaintTiming;
            value = newPerformanceTiming.loadEventEnd - newPerformanceTiming.startTime
        } else {
            const oldPerformanceTiming = window.performance.timing;
            entries = oldPerformanceTiming as PerformanceTiming;
            value = oldPerformanceTiming.loadEventEnd - oldPerformanceTiming.navigationStart;
        }

        WINDOW.Sender.push(constructReportData(VITALS_LOAD, {
            name: VITALS_LOAD,
            metric: value,
            entry: entries,
        }))

    });
}
