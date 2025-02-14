import {EventEnum} from "@/enum/EventEnum";
import {
    buildConsoleTraceId,
    buildErrorTraceId,
    buildPromiseErrorTraceId,
    buildRequestErrorTraceId,
    buildResourceErrorTraceId
} from "@/utils/traceId/error";
import {uuid} from "@/utils/uuid";
import {BrowserEventTypes} from "@/enum/BrowserEventTypes";
import {md5} from "@/utils";

type ErrorEventType = EventEnum | BrowserEventTypes;

export const traceIdentifier = 'v5';

/**
 * 构造链路 ID
 * @param {ErrorEventType} type 收集类型
 * @param args 数据集
 */
export const generateTraceId = (type: ErrorEventType, ...args: any[]): { traceId: string } => {
    let traceId;

    switch (type) {
        case EventEnum.ERROR:

            const {type, message, filename, row, columns} = args as unknown as {
                type: string,
                message: string,
                filename: string,
                row: number,
                columns: number
            };

            traceId = buildErrorTraceId(type, message, filename, row, columns);
            break;

        case BrowserEventTypes.RESOURCE_ERROR:
            const {tag, src} = args as unknown as {
                tag: string,
                src: string
            }

            traceId = buildResourceErrorTraceId(tag, src);
            break;

        case EventEnum.PROMISE:
            traceId = buildPromiseErrorTraceId((args as unknown as {
                message: string
            }).message);
            break;
        case BrowserEventTypes.FETCH:
        case BrowserEventTypes.XHR:
            const {method, url, headers, status, statusText} = args as unknown as {
                method: string,
                url: string,
                headers: any,
                status: number,
                statusText: string,
            }
            traceId = buildRequestErrorTraceId(method, url, headers, status, statusText);
            break;
        case BrowserEventTypes.CONSOLE:
            const {types, params} = args as unknown as {
                types: string;
                params: any
            }
            traceId = buildConsoleTraceId(types, params);
            break;
        default:
            traceId = `${traceIdentifier}-${md5(uuid())}`;
            break;
    }

    return {traceId};
}