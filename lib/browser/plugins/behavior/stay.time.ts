import {BaseMonitorPlugin} from "@/core/baseMonitorPlugin";
import {ClientTypes} from "@/types/clientTypes";
import {whenReady} from "@/helper/whenReady";
import {onVisible} from "@/helper/onVisible";
import {onHidden} from "@/helper/onHidden";
import {WINDOW} from "@/utils";
import {constructorReport} from "@/helper/constructorReport";
import {BrowserBreadcrumbTypes, BrowserEventTypes} from "@/enum/BrowserEventTypes";
import {addBreadcrumbInBrowser} from "@/browser/utils";
import {generateTraceId} from "@/utils/traceId";
import {StayTimePayload} from "@/types/sender.types";

export class StayTimeMonitorPlugin extends BaseMonitorPlugin {
    private timer: number = 0;

    initialize(client: ClientTypes) {

        whenReady(() => {
            this.setTime();
            addBreadcrumbInBrowser(client, {
                action: BrowserBreadcrumbTypes.PAGE_ENTRY,
                start_time: this.timer,
            }, BrowserBreadcrumbTypes.ROUTE)
        });

        onHidden(() => {
            const endTime = Date.now();

            const millis = endTime - this.timer;

            const breadcrumb = addBreadcrumbInBrowser(client, {
                action: BrowserBreadcrumbTypes.PAGE_EXIT,
                end_time: endTime,
            }, BrowserBreadcrumbTypes.ROUTE)

            const data = {
                start_time: this.timer,
                end_time: endTime,
                duration: Math.floor(millis / 1e3),
                href: WINDOW.location.href,
                ...generateTraceId(BrowserEventTypes.STAY_TIME),
                breadcrumbs: breadcrumb
            } as StayTimePayload;

            client.sender.immediately(constructorReport(BrowserEventTypes.STAY_TIME, data))

        })

        onVisible(() => {
            this.setTime();
            addBreadcrumbInBrowser(client, {
                action: BrowserBreadcrumbTypes.PAGE_RE_ENTRY,
                refresh_start_time: this.timer,
            }, BrowserBreadcrumbTypes.ROUTE)
        });

    }

    setTime() {
        this.timer = Date.now();
    }
}