export const onHidden = (cb: (e: Event) => void, once: boolean) => {
    const onHiddenOrPageHide = (event: Event) => {
        if (event.type === 'pagehide' || document.visibilityState === 'hidden') {
            cb(event);
            if (once) {
                removeEventListener('visibilitychange', onHiddenOrPageHide, true);
                removeEventListener('pagehide', onHiddenOrPageHide, true);
            }
        }
    }

    addEventListener('visibilitychange', onHiddenOrPageHide, true);
    addEventListener('pagehide', onHiddenOrPageHide, true);
}