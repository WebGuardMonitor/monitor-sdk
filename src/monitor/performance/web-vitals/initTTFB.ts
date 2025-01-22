import {onTTFB} from "web-vitals";
import {VITALS_TTFB} from "../../../common";
import {WINDOW} from "../../../types";
import {constructReportData} from "../../../helper/BasicData";

export const initTTFB = () => {
    // whenReady(() => {
    //     const navigationEntry: PerformanceNavigationTiming = getNavigationEntry();
    //
    //     const data = {
    //         name: VITALS_TTFB,
    //         metric: Math.max(navigationEntry.responseStart - getActivationStart(), 0),
    //         entry: navigationEntry
    //     }
    //
    //     bindReporter(data)
    // })
    onTTFB((metric) => {
        WINDOW.Sender.push(constructReportData(VITALS_TTFB, {
            name: VITALS_TTFB,
            metric: metric.value,
            entry: metric.entries,
            vitals: metric
        }))
    })
}