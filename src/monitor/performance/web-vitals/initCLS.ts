import { onCLS } from 'web-vitals';
import { VITALS_CLS } from '../../../common';
import { WINDOW } from '../../../types';
import { constructReportData } from '../../../helper/BasicData';

export const initCLS = () => {
    onCLS((metric) => {
        WINDOW.Sender.push(
            constructReportData(VITALS_CLS, {
                name: VITALS_CLS,
                metric: metric.value,
                entry: metric.entries,
                vitals: metric,
            }),
        );
    });
};
