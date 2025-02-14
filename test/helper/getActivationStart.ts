import { getNavigationEntry } from './getNavigationEntry';

export const getActivationStart = () => {
    const navEntry = getNavigationEntry();
    return (navEntry && navEntry.activationStart) || 0;
};
