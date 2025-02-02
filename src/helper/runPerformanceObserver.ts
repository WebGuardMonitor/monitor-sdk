import { isPerformanceObserverSupported, isPerformanceSupported } from '../utils';

/**
 * performance 性能指标兼容性处理执行
 *
 * @param newCallback 代表执行 支持现代化浏览器 new PerformanceObserver 特性
 * @param oldCallback 执行 旧浏览器兼容性
 */
const runPerformanceObserver = (newCallback: () => void, oldCallback: () => void) => {
    if (isPerformanceObserverSupported()) {
        newCallback();
    } else {
        if (isPerformanceSupported()) {
            oldCallback();
        }
    }
};
