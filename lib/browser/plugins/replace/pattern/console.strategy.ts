import {ClientTypes} from "@/types/clientTypes";
import {ConsoleLevel} from "@/types/instrument";
import {addBreadcrumbInBrowser} from "@/browser/utils";
import {LEVEL, REPORT_NOW} from "@/enum/constant";
import {BrowserBreadcrumbTypes, BrowserEventTypes} from "@/enum/BrowserEventTypes";
import {constructorReport} from "@/helper/constructorReport";
import {generateTraceId} from "@/utils/traceId";
import {ConsolePayload} from "@/types/sender.types";

const immediatelyConsoleLevel: ConsoleLevel[] = ['debug', 'warn', 'error'];


/**
 * 转换 console 函数中的内容
 * @param content
 */
const transformConsoleData = (content: any): object => {
    const data: any = {};

    if (Array.isArray(content)) {
        content.map((item, index) => {
            if (Array.isArray(item)) {
                const result = transformConsoleData(item);
                Object.assign(data, result);
            } else if (typeof item === 'object' && item !== null) {
                const name = Object.getPrototypeOf(item)['name'];
                const propertyDescriptors = Object.getOwnPropertyNames(item);
                const items = {};

                propertyDescriptors.forEach(row => {
                    // @ts-ignore
                    items[`${name}_${row}`] = item[row];
                })

                Object.assign(data, items);
            } else {
                data[index] = item;
            }
        })
    }

    return data;
}

interface consoleStrategy {
    listener(client: ClientTypes, level: ConsoleLevel, ...args: any[]): boolean;
}

/**
 * 创建控制台调试策略
 */
export class createConsoleStrategy {
    private readonly strategy: consoleStrategy[];

    constructor() {
        this.strategy = []
    }

    /**
     * 写入监听策略
     * @param consoleStrategy
     */
    setStrategy(consoleStrategy: consoleStrategy) {
        this.strategy.push(consoleStrategy)
    }

    /**
     * 开启监听
     */
    listener(client: ClientTypes, level: ConsoleLevel, args: any) {
        for (const strategy of this.strategy) {
            const result = strategy.listener(client, level, args)
            if (!result) {
                return;
            }
        }
    }
}

/**
 * debug 控制台打印策略
 */
export class consoleImmediatelyStrategy implements consoleStrategy {
    listener(client: ClientTypes, level: ConsoleLevel, ...args: any): boolean {
        if (immediatelyConsoleLevel.includes(level)) {
            const params = transformConsoleData(args)

            const data = {
                types: level,
                params: params,
            }

            const breadcrumb = addBreadcrumbInBrowser(
                client,
                data,
                BrowserBreadcrumbTypes.CONSOLE,
                LEVEL.ERROR
            );

            // 立即上报
            const reportData = {
                ...data,
                ...generateTraceId(BrowserEventTypes.CONSOLE, data),
                breadcrumbs: breadcrumb
            } as ConsolePayload;

            client.sender.immediately(constructorReport(BrowserEventTypes.CONSOLE, reportData), REPORT_NOW)

            return false;
        }

        return true;
    }
}

/**
 * 默认策略
 */
export class consoleDefaultStrategy implements consoleStrategy {
    listener(client: ClientTypes, level: ConsoleLevel, ...args: any): boolean {

        if (!immediatelyConsoleLevel.includes(level)) {

            const params = transformConsoleData(args)

            const data = {
                types: level,
                params: params
            }

            const breadcrumb = addBreadcrumbInBrowser(
                client,
                data,
                BrowserBreadcrumbTypes.CONSOLE,
                LEVEL.INFO
            );

            const reportData = {
                ...data,
                ...generateTraceId(BrowserEventTypes.CONSOLE, data),
                breadcrumbs: breadcrumb
            } as ConsolePayload;
            // 分批上报
            client.sender.immediately(constructorReport(BrowserEventTypes.CONSOLE, reportData))

        }

        return false;
    }
}
