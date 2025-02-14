import {GLOBAL_NAME} from "@/enum/constant";

if (!(globalThis as any)[`${GLOBAL_NAME}`]) {
    (globalThis as any)[`${GLOBAL_NAME}`] = {};
}

/**
 * 为 SDK 创建全局数据
 * @param key
 * @param value
 */
export const createGlobal = (key: string, value: string) => {
    (globalThis as any)[`${GLOBAL_NAME}`][key] = value;
}