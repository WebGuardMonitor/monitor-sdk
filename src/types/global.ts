import {Options} from './option';
import {Sender} from "../common/sender";

export type InternalGlobal = {
    option: Options;
    DeviceFingerprintId: string;
    navigator: {
        userAgentData: {
            brands: Array<{ brand: string; version: string }>;
            mobile: boolean;
            platform: string;
        };
    };
    PerformanceObserver: PerformanceObserver;
    Sender: Sender
};

export const GLOBAL_OBJ = globalThis as unknown as InternalGlobal;

export const WINDOW = GLOBAL_OBJ as typeof GLOBAL_OBJ & Window;
