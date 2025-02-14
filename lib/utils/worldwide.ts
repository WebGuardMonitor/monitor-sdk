// 可在此进行扩展全局属性
export type InternalGlobal = {
    __SENTINEL__: {
        session_id: string;
    };
    console: Console
}

export const GLOBAL_OBJ = globalThis as unknown as InternalGlobal;

export const WINDOW = GLOBAL_OBJ as typeof GLOBAL_OBJ & Window;
