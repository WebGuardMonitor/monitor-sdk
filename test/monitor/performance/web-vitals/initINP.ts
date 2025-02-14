import { onINP } from 'web-vitals';
import { VITALS_INP } from '../../../common';
import { WINDOW } from '../../../types';
import { constructReportData } from '../../../helper/BasicData';

export const initINP = () => {
    onINP((metric) => {
        WINDOW.Sender.push(
            constructReportData(VITALS_INP, {
                name: VITALS_INP,
                metric: metric.value,
                entry: metric.entries,
                vitals: metric,
            }),
        );
    });
};
