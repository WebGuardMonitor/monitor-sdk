import {ClientTypes} from "@/types/clientTypes";
import {BrowserBreadcrumbTypes} from "@/enum/BrowserEventTypes";
import {LEVEL} from "@/enum/constant";
import {BreadcrumbTypes} from "@/types/breadcrumbTypes";

/**
 * 添加行为记录
 * @param client
 * @param behaviorData
 * @param action
 * @param level
 */
export const addBreadcrumbInBrowser = (
    client: ClientTypes,
    behaviorData: object,
    action: BrowserBreadcrumbTypes,
    level: string = LEVEL.INFO
): BreadcrumbTypes[] => {
    return client.breadcrumb.add({
        action: action,
        level,
        timestamp: Date.now(),
        description: JSON.stringify(behaviorData)
    })
}