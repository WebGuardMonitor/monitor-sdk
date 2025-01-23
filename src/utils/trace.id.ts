import {md5} from "./md5";
import {uuid} from "./uuid";
import dayjs from "dayjs";

/**
 * 构造错误链接
 * @param data
 */
export const buildTraceId = (data: string): object => {
    const time = dayjs().format('YYYYMMDDHHmmss');

    return {
        traceId: time + md5(`${uuid()}` + data)
    }
}