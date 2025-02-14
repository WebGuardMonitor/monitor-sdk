/**
 * 只跑一次
 * @param callback
 */
export const runOnce = (callback: () => void) => {
    let called = false;

    return () => {
        if (!called) {
            callback();
            called = true;
        }
    };
}