/**
 * 获取浏览器性能时间线
 * @link https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceNavigationTiming
 */
export const getNavigationEntry = () => {
    const navigationEntry =
        self.performance &&
        performance.getEntriesByType &&
        performance.getEntriesByType('navigation')[0];

    return navigationEntry && navigationEntry.responseStart > 0 && navigationEntry.responseStart < performance.now()
        ? navigationEntry
        : {} as PerformanceNavigationTiming;
}