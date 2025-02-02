import { whenLoad } from '../../../helper/whenLoad';
import { getNavigationEntry } from '../../../helper/getNavigationEntry';
import { WINDOW } from '../../../types';
import { VITALS_LOAD } from '../../../common';
import { constructReportData } from '../../../helper/BasicData';
import { getDefaultPerformance } from '../../../utils';

// https://juejin.cn/post/7218513153402224695#heading-5

/**
 * 初始化加载时间
 */
export const initLoad = () => {
    whenLoad(() => {
        setTimeout(() => {
            Promise.resolve().then(() => {
                let value: number;
                let entries;

                const newPerf = getNavigationEntry() as PerformanceNavigationTiming;
                if (newPerf) {
                    value = newPerf.loadEventEnd - newPerf.startTime;
                    entries = newPerf;
                } else {
                    const oldPerf = getDefaultPerformance()?.timing as PerformanceTiming;
                    value = oldPerf.loadEventEnd - oldPerf.navigationStart;
                    entries = oldPerf;
                }

                WINDOW.Sender.push(
                    constructReportData(VITALS_LOAD, {
                        name: VITALS_LOAD,
                        metric: value,
                        entry: entries,
                    }),
                );
            });
        }, 0);
    });
};
