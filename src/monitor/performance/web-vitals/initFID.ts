import {VITALS_FID} from "../../../common";
import {bindReporter} from "../../../helper/bindReporter";
import {onFID} from "web-vitals";

export const initFID = () => {
    // whenActivated(() => {
    //
    //     const handleEntries = (entries: PerformanceEventTiming[]) => {
    //         entries.forEach(entry => {
    //             // @ts-ignore
    //             po!.disconnect()
    //
    //             const data = {
    //                 name: VITALS_FID,
    //                 metric: entry.startTime,
    //                 entry
    //             }
    //             bindReporter(data)
    //         })
    //     }
    //
    //     const po = observe('first-input', handleEntries)
    //
    //     if (po) {
    //         onHidden(() => {
    //             // @ts-ignore
    //             po!.takeRecords().map(eventHandler)
    //             // @ts-ignore
    //             po.disconnect()
    //         }, true)
    //     }
    // })

    onFID((metric) => {
        bindReporter({
            name: VITALS_FID,
            metric: metric.value,
            entry: metric.entries,
            vitals: metric
        })
    })
}