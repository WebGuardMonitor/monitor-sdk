import {BaseMonitorPlugin} from "@/core/baseMonitorPlugin";
import {ClientTypes} from "@/types/clientTypes";
import {BrowserBreadcrumbTypes, BrowserEventTypes} from "@/enum/BrowserEventTypes";
import {getStorageItem, setStorageItem, WINDOW} from "@/utils";
import {ISUv} from "@/enum/constant";
import {constructorReport} from "@/helper/constructorReport";
import {addBreadcrumbInBrowser} from "@/browser/utils";
import {on} from "@/utils/addEventListener";
import {EventEnum} from "@/enum/EventEnum";

export class PageViewMonitorPlugins extends BaseMonitorPlugin {
    initialize(client: ClientTypes) {

        // UV 数据上报
        if (!getStorageItem(ISUv)) {
            setStorageItem(ISUv, '1')
            client.sender.immediately(
                constructorReport(BrowserEventTypes.USER_VIEW, {
                    page_id: client.config.page_id,
                    source: client.config.href
                })
            );
        }

        // PV 数据上报
        client.sender.immediately(
            constructorReport(BrowserEventTypes.PAGE_VIEW, {
                page_id: client.config.page_id,
                source: client.config.href
            })
        );

        // 监控页面是直接访问还是页面跳转访问
        if (document.referrer) {

            addBreadcrumbInBrowser(client, {
                action: BrowserBreadcrumbTypes.PAGE_ENTRY,
                from: document.referrer,
                to: WINDOW.location.href,
                isReferrer: true,
                timestamp: Date.now()
            }, BrowserBreadcrumbTypes.ROUTE)

        } else {

            addBreadcrumbInBrowser(client, {
                action: BrowserBreadcrumbTypes.PAGE_ENTRY,
                from: '',
                to: WINDOW.location.href,
                isReferrer: false,
                timestamp: Date.now()
            }, BrowserBreadcrumbTypes.ROUTE)

        }
    }

    /**
     * 监听页面路由变化
     *
     * @link https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event
     * @link https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState
     * @link https://developer.mozilla.org/zh-CN/docs/Web/API/History/replaceState
     */
    listenerPageRouter() {

        // TODO 待完成的功能
        // on(WINDOW, EventEnum.POPSTATE, (event: PopStateEvent) => {
        //     alert(event)
        // })

        if (!('history' in WINDOW)) {
            return;
        }
    }
}