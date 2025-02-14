import { MonitorImplements, WINDOW } from '../../types';
import { onHidden } from '../../helper/onHidden';
import { whenVisible } from '../../helper/whenVisible';
import { constructReportData } from '../../helper/BasicData';
import { RESOURCE_TYPE } from '../../common';

/**
 * 资源监控
 * @link https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceResourceTiming
 * @link https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/initiatorType
 */
export class ResourceTimingMonitor implements MonitorImplements {
    // 资源类型
    private staticResourceType = ['img', 'css', 'script', 'link', 'iframe', 'audio', 'video', 'source'];

    // 数据类型
    private dataResourceType = ['fetch', 'xmlhttprequest'];

    // 任务
    private schedule: number = 0;

    initialize() {
        this.schedule = setInterval(() => this.collectResource(), 2000);

        // page close hidden this schedule
        onHidden(() => {
            clearInterval(this.schedule);
        }, false);

        // page visible restart this schedule
        whenVisible(() => {
            this.schedule = setInterval(() => this.collectResource(), 2000);
        });
    }

    /**
     * 收集资源
     */
    collectResource() {
        const entries = (performance.getEntriesByType('resource') as PerformanceResourceTiming[]) || [];

        entries.map((resource) => {
            if (this.staticResourceType.includes(resource.initiatorType)) {
                WINDOW.Sender.push(
                    constructReportData(RESOURCE_TYPE, {
                        type: resource.initiatorType,
                        url: resource.name,
                        timing: resource.toJSON(),
                    }),
                );
            }
        });
    }
}
