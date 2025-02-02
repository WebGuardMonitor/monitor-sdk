import { onLCP } from 'web-vitals';
import { VITALS_LCP } from '../../../common';
import { WINDOW } from '../../../types';
import { constructReportData } from '../../../helper/BasicData';

export const initLCP = () => {
    onLCP((metric) => {
        WINDOW.Sender.push(
            constructReportData(VITALS_LCP, {
                name: VITALS_LCP,
                metric: metric.value,
                entry: metric.entries,
                vitals: metric,
            }),
        );
    });
};
