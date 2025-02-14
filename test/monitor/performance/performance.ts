import { MonitorImplements, WINDOW } from '../../types';
import { getDefaultPerformance } from '../../utils';
import { constructReportData } from '../../helper/BasicData';
import { PERFORMANCE_TIMING_EV_TYPE } from '../../common';
import { getNavigationEntry } from '../../helper/getNavigationEntry';
import { whenLoad } from '../../helper/whenLoad';

export class PerformanceMonitor implements MonitorImplements {
    initialize() {
        whenLoad(() => {
            const performance = getDefaultPerformance();

            WINDOW.Sender.push(
                constructReportData(PERFORMANCE_TIMING_EV_TYPE, {
                    timing: (performance && performance.timing) || void 0,
                    navigation_timing: getNavigationEntry(),
                }),
            );
        });
    }
}
