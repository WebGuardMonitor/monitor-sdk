import {observe} from "../../../helper/observe";
import {whenActivated} from "../../../helper/whenActivated";
import {VITALS_FP} from "../../../common";
import {bindReporter} from "../../../helper/bindReporter";

export const initFP = () => {
    whenActivated(() => {

        const handleEntries = (entries: PerformancePaintTiming[]) => {
            entries.forEach((entry) => {
                if (entry.name === 'first-paint') {
                    // @ts-ignore
                    po!.disconnect()

                    const data = {
                        name: VITALS_FP,
                        metric: entry.startTime,
                        entry
                    }
                    bindReporter(data)
                }
            })
        }

        const po = observe('paint', handleEntries)
    })
}

