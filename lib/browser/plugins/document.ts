import {BaseMonitorPlugin} from "@/core/baseMonitorPlugin";
import {ClientTypes} from "@/types/clientTypes";
import {on} from "@/utils/addEventListener";
import {EventEnum} from "@/enum/EventEnum";
import {BrowserBreadcrumbTypes} from "@/enum/BrowserEventTypes";
import {addBreadcrumbInBrowser} from "@/browser/utils";

/**
 *
 * @param event
 */
export const transformBehaviorData = (event: MouseEvent) => {
    const events = event as MouseEvent & {
        target: HTMLElement
    }

    return {
        html: events.target.outerHTML,
        client: {
            // 点击事件发生时鼠标对应的浏览器窗口的 x 轴坐标。
            x: events.clientX,
            // 点击事件发生时鼠标对应的浏览器窗口的 y 轴坐标。
            y: events.clientY
        },
        screen: {
            // 点击事件发生时鼠标对应的屏幕 x 轴坐标。
            x: events.screenX,
            // 点击事件发生时鼠标对应的屏幕 y 轴坐标。
            y: events.screenY
        }
    }
}

export class DocumentMonitorPlugin extends BaseMonitorPlugin {
    initialize(client: ClientTypes) {
        this.listenClick(client)
        this.listenDblClick(client)
    }

    /**
     * 监控点击事件
     * @param client
     */
    listenClick(client: ClientTypes) {
        // 监听点击事件
        on(document, EventEnum.CLICK, (event: MouseEvent) => {

            /**
             * 监测是否是点击的 按钮 事件，若非按钮事件直接返回
             * 使用 closest 匹配特定选择器且离当前元素最近的祖先元素
             * @link https://developer.mozilla.org/zh-CN/docs/Web/API/Element/closest
             */
            const target = event.target as HTMLElement;
            if (!target.closest('button')) return;

            const events = event as MouseEvent & {
                target: HTMLButtonElement
            }

            const behaviorData = transformBehaviorData(events)

            addBreadcrumbInBrowser(client, behaviorData, BrowserBreadcrumbTypes.CLICK)
        })
    }

    /**
     * 监控双击事件
     * @param client
     */
    listenDblClick(client: ClientTypes) {
        on(document, EventEnum.DBL_CLICK, (event: MouseEvent) => {

            const events = event as MouseEvent & {
                target: HTMLElement
            }

            const behaviorData = transformBehaviorData(events)

            addBreadcrumbInBrowser(client, behaviorData, BrowserBreadcrumbTypes.DBL_CLICK)
        })
    }
}
