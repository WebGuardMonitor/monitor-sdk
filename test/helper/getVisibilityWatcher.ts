import { onHidden } from './onHidden';

let firstHiddenTime = document.visibilityState === 'hidden' ? 0 : Infinity;

export const getVisibilityWatcher = () => {
    onHidden((e: Event) => {
        firstHiddenTime = Math.min(firstHiddenTime, e.timeStamp);
    }, true);

    return {
        get firstHiddenTime() {
            return firstHiddenTime;
        },
    };
};
