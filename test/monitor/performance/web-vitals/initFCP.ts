import { VITALS_FCP } from '../../../common';
import { onFCP } from 'web-vitals';
import { WINDOW } from '../../../types';
import { constructReportData } from '../../../helper/BasicData';

export const initFCP = () => {
    // whenActivated(() => {
    //     const handleEntries = (entries: PerformancePaintTiming[]) => {
    //         entries.forEach(entry => {
    //             if (entry.name === 'first-contentful-paint') {
    //                 // @ts-ignore
    //                 po!.disconnect()
    //
    //                 const data = {
    //                     name: VITALS_FCP,
    //                     metric: entry.startTime,
    //                     entry
    //                 }
    //                 bindReporter(data)
    //             }
    //         })
    //     }
    //
    //     const po = observe('paint', handleEntries)
    // })
    onFCP((metric) => {
        WINDOW.Sender.push(
            constructReportData(VITALS_FCP, {
                name: VITALS_FCP,
                metric: metric.value,
                entry: metric.entries,
                vitals: metric,
            }),
        );
    });
};
