import {onTTFB} from "web-vitals";
import {bindReporter} from "../../../helper/bindReporter";
import {VITALS_TTFB} from "../../../common";

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
        bindReporter({
            name: VITALS_TTFB,
            metric: metric.value,
            entry: metric.entries,
            vitals: metric
        })
    })
}