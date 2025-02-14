import {BaseMonitorPlugin} from "@/core/baseMonitorPlugin";
import {ClientTypes} from "@/types/clientTypes";
import {observe} from "@/helper/observe";
import {BrowserEventTypes, BrowserPerformanceMetric} from "@/enum/BrowserEventTypes";
import {constructorReport} from "@/helper/constructorReport";
import {generateTraceId} from "@/utils/traceId";
import {ResourcePayload} from "@/types/sender.types";

export class ResourceTimingMonitorPlugin extends BaseMonitorPlugin {


    /**
     * 监听的资源类型
     * @private
     * @link https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/initiatorType
     */
    private resourceInitiatorType = [
        'audio',
        'body',
        'css',
        'early-hint',
        'embed',
        'frame',
        'iframe',
        'image',
        'img',
        'link',
        'script',
        'video'
    ];


    initialize(client: ClientTypes) {

        const handleEntries = (entry: PerformanceResourceTiming[]) => {

            entry.forEach(entries => {
                if (this.resourceInitiatorType.includes(entries.initiatorType)) {

                    const entry = entries.toJSON()
                    const data = {
                        ...entry,
                        ...generateTraceId(BrowserEventTypes.RESOURCE),
                    } as ResourcePayload;

                    client.sender.immediately(constructorReport(BrowserEventTypes.RESOURCE, data))
                }
            })

        }

        observe(BrowserPerformanceMetric.RESOURCE, handleEntries)
    }
}