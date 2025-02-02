import { getNavigationEntry } from '../../../helper/getNavigationEntry';
import { whenLoad } from '../../../helper/whenLoad';
import { WINDOW } from '../../../types';
import { constructReportData } from '../../../helper/BasicData';
import { VITALS_DCL } from '../../../common';
import { getDefaultPerformance } from '../../../utils';

// https://juejin.cn/post/7394790673613029388

/**
 * 计算完全加载和解析完成之后，DomContentLoaded 事件被触发，无需等待样式表、图像和子框架的完成加载
 */
export const initDCL = () => {
    whenLoad(() => {
        let value: number;
        let entries;

        const newPerformanceTiming = getNavigationEntry();

        if (newPerformanceTiming) {
            entries = newPerformanceTiming as PerformancePaintTiming;
            value = newPerformanceTiming.domContentLoadedEventEnd - newPerformanceTiming.startTime;
        } else {
            const oldPerformanceTiming = getDefaultPerformance()?.timing as PerformanceTiming;
            entries = oldPerformanceTiming;
            value = oldPerformanceTiming.domContentLoadedEventEnd - oldPerformanceTiming.navigationStart;
        }

        WINDOW.Sender.push(
            constructReportData(VITALS_DCL, {
                name: VITALS_DCL,
                metric: value,
                entry: entries,
            }),
        );
    });
};
