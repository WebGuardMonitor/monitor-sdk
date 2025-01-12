interface PerformanceEntryMap {
    'event': PerformanceEventTiming[];
    'first-input': PerformanceEventTiming[];
    'layout-shift': LayoutShift[];
    'largest-contentful-paint': LargestContentfulPaint[];
    'long-animation-frame': PerformanceLongAnimationFrameTiming[];
    'paint': PerformancePaintTiming[];
    'navigation': PerformanceNavigationTiming[];
    'resource': PerformanceResourceTiming[];
}

export const observe = <K extends keyof PerformanceEntryMap>(type: K, callback: (entries: PerformanceEntryMap[K]) => void): PerformanceObserver | unknown => {
    try {
        if (PerformanceObserver.supportedEntryTypes.includes(type)) {
            const po = new PerformanceObserver((list) => {

                Promise.resolve().then(() => {
                    callback(list.getEntries() as PerformanceEntryMap[K])
                })

            })

            po.observe({type, buffered: true})
            return po;
        } else {
            return undefined;
        }
    } catch (e) {
        return e;
    }
}