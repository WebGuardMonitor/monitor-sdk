import { WINDOW } from '../types';

export const createReporter = (callback: Function) => {
    WINDOW.requestIdleCallback(
        () => {
            callback();
        },
        {
            timeout: 150,
        },
    );
};
