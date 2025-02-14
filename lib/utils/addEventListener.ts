/**
 * 注册事件监听器
 * @param target
 * @param type
 * @param callback
 * @param options
 */
type EventTargetType = Window | Document;

// 定义一个映射类型，根据目标类型确定事件类型
type EventMap<T extends EventTargetType> = T extends Window ? WindowEventMap : T extends Document ? DocumentEventMap : never;

// 定义事件类型，确保它是目标类型的有效事件
type EventType<T extends EventTargetType> = keyof EventMap<T>;

export const on = <T extends EventTargetType, K extends EventType<T>>(
    target: T,
    type: K,
    callback: (event: EventMap<T>[K]) => void,
    options?: boolean | AddEventListenerOptions
): void => {
    target.addEventListener(type.toString(), callback as EventListenerOrEventListenerObject, options);
};