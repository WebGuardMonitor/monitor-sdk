import {WrappedFunction} from "@/types/wrappedfunction";

/**
 * Replace a method in an object with a wrapped version of itself.
 *
 * @param source An object that contains a method to be wrapped.
 * @param name The name of the method to be wrapped.
 * @param replacementFactory A higher-order function that takes the original version of the given method and returns a
 * wrapped version. Note: The function returned by `replacementFactory` needs to be a non-arrow function, in order to
 * preserve the correct value of `this`, and the original method must be called using `origMethod.call(this, <other
 * args>)` or `origMethod.apply(this, [<other args>])` (rather than being called directly), again to preserve `this`.
 * @returns void
 * @link https://github.com/getsentry/sentry-javascript/blob/develop/packages/core/src/utils-hoist/object.ts#L21
 */
export const fill = (
    source: {
        [key: string]: any
    },
    name: string,
    replacementFactory: (...args: any[]) => any
): void => {
    // 检测需要重写覆盖的函数是否在源中
    if (!(name in source)) {
        return;
    }

    const original = source[name] as () => any;
    const wrapped = replacementFactory(original) as WrappedFunction;


    // Make sure it's a function first, as we need to attach an empty prototype for `defineProperties` to work
    // otherwise it'll throw "TypeError: Object.defineProperties called on non-object"
    if (typeof wrapped === 'function') {
        markFunctionWrapped(wrapped, original);
    }

    try {
        source[name] = wrapped;
    } catch {
        console.log(`Failed to replace method "${name}" in object`, source);
    }
}

/**
 * Defines a non-enumerable property on the given object.
 *
 * @param obj The object on which to set the property
 * @param name The name of the property to be set
 * @param value The value to which to set the property
 */
export function addNonEnumerableProperty(obj: object, name: string, value: unknown): void {
    try {
        Object.defineProperty(obj, name, {
            // enumerable: false, // the default, so we can save on bundle size by not explicitly setting it
            value: value,
            writable: true,
            configurable: true,
        });
    } catch (o_O) {
        console.log(`Failed to add non-enumerable property "${name}" to object`, obj);
    }
}

/**
 * Remembers the original function on the wrapped function and
 * patches up the prototype.
 *
 * @param wrapped the wrapper function
 * @param original the original function that gets wrapped
 */
export const markFunctionWrapped = (wrapped: WrappedFunction, original: WrappedFunction): void => {
    try {
        const proto = original.prototype || {};
        wrapped.prototype = original.prototype = proto;
        addNonEnumerableProperty(wrapped, '__sentinel_original__', original);
    } catch (o_O) {} // eslint-disable-line no-empty
}
