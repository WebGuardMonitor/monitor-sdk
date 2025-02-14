import { WINDOW } from '../types';

/**
 * 判断是否为对象
 * @param obj
 */
export const isObject = (obj: any): obj is Record<string, any> => {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
};

export const isPerformanceSupported = (): boolean => {
    return !!WINDOW.performance && !!WINDOW.performance.getEntriesByType && !!WINDOW.performance.mark;
};

export const isPerformanceObserverSupported = (): boolean => {
    return !!WINDOW.PerformanceObserver;
};

export const isNavigatorSupported = (): boolean => {
    return !!WINDOW.navigator;
};
