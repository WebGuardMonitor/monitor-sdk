/*
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { WINDOW } from '../types';

export const getNavigationEntry = (): PerformanceNavigationTiming => {
    const perf = WINDOW.performance;

    if (!perf || !perf.getEntriesByType) {
        throw new Error('Performance API not available');
    }

    const navigationEntries = perf.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    const navigationEntry = navigationEntries[0];

    if (navigationEntry && navigationEntry.responseStart > 0 && navigationEntry.responseStart < perf.now()) {
        return navigationEntry;
    }

    // 如果没有找到符合条件的 entry，可以考虑抛出异常或返回一个默认对象
    throw new Error('No valid navigation entry found');
};
