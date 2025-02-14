export type WrappedFunction<T extends Function = Function> = T & {
    __sentinel_wrapped__?: WrappedFunction<T>;
    __sentinel_original__?: T;
};