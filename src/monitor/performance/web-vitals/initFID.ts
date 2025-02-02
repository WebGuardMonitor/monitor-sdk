import { VITALS_FID } from '../../../common';
import { onFID } from 'web-vitals';
import { WINDOW } from '../../../types';
import { constructReportData } from '../../../helper/BasicData';

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
        WINDOW.Sender.push(
            constructReportData(VITALS_FID, {
                name: VITALS_FID,
                metric: metric.value,
                entry: metric.entries,
                vitals: metric,
            }),
        );
    });
};
