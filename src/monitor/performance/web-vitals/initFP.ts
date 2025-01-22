import {observe} from "../../../helper/observe";
import {whenActivated} from "../../../helper/whenActivated";
import {VITALS_FP} from "../../../common";
import {WINDOW} from "../../../types";
import {constructReportData} from "../../../helper/BasicData";

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

                    WINDOW.Sender.push(constructReportData(VITALS_FP, data))
                }
            })
        }

        const po = observe('paint', handleEntries)
    })
}

