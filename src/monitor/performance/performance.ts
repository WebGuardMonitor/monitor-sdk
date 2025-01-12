import {MonitorImplements} from "../../types";
import {createBrowserSender, getDefaultPerformance} from "../../utils";
import {constructReportData} from "../../helper/BasicData";
import {PERFORMANCE_TIMING_EV_TYPE} from "../../common";
import {getReportUrl} from "../../helper/BasicUrl";
import {getNavigationEntry} from "../../helper/getNavigationEntry";
import {whenLoad} from "../../helper/whenLoad";

export class PerformanceMonitor implements MonitorImplements {
    initialize() {
        whenLoad(() => {

            const performance = getDefaultPerformance()

            createBrowserSender.sendHttp().post({
                url: getReportUrl(),
                data: constructReportData(PERFORMANCE_TIMING_EV_TYPE, {
                    timing: performance && performance.timing || void 0,
                    navigation_timing: getNavigationEntry(),
                })
            })

        })
    }
}