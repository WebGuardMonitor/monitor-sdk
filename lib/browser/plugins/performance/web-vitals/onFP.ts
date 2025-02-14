import {whenActivated} from "@/helper/whenActivated";
import {BrowserPerformanceEntry} from "@/enum/BrowserEventTypes";
import {observe} from "@/helper/observe";

export const FPThresholds = [0, 0]
export const onFP = (
    onReport: (metric: any) => void
) => {
    whenActivated(() => {

        const handleEntries = (entries: PerformancePaintTiming[]) => {
            entries.forEach((entry) => {
                if (entry.name === 'first-paint') {
                    // @ts-ignore
                    po!.disconnect();

                    const data = {
                        name: BrowserPerformanceEntry.FP,
                        value: entry.startTime,
                        entry,
                    };

                    onReport(data)
                }
            });
        };

        const po = observe('paint', handleEntries);

    })
}