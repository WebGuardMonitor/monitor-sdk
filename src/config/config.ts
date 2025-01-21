import {ConfigManager} from './ConfigManager';
import {ConfigOptionType, Options} from '../types';

let configInstance: ConfigManager | null = null;

const initConfig = (options: Options) => {
    if (!configInstance) {
        configInstance = ConfigManager.getInstance(options);
    } else {
        console.warn('Config has already been initialized.');
    }
};

const get = <K extends keyof ConfigOptionType>(key: K): ConfigOptionType[K] => {
    if (!configInstance) {
        throw new Error('Config must be initialized before use.');
    }

    return configInstance.getOption(key);
};

const set = (key: string, value: any) => {
    if (!configInstance) {
        throw new Error('Config must be initialized before use.');
    }
    configInstance.setOption(key, value);
};

const getAll = () => {
    return configInstance?.getAllOptions()
}

export default {
    init: initConfig,
    get,
    set,
    getAll
};
