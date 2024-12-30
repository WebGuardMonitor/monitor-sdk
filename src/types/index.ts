export interface Options {
    // 上报地址
    report: string;
    // 应用 ID
    appId: string;
    // 当前用户 ID
    userId?: string;
}

export type EventType = 'js错误' | 'promise错误' | 'performance'

export type InternalGlobal = {
    option: Options;
    DeviceFingerprintId: string;
    navigator: {
        userAgentData: {
            brands: Array<{ brand: string; version: string }>;
            mobile: boolean;
            platform: string;
        };
    }
}

export const GLOBAL_OBJ = globalThis as unknown as InternalGlobal;

export const WINDOW = GLOBAL_OBJ as typeof GLOBAL_OBJ & Window;