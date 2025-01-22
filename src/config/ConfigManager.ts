import {ConfigOptionType, Options} from '../types';
import {generateSessionId, generateUserId} from '../utils';

export class ConfigManager {
    private static instance: ConfigManager;
    private readonly options: ConfigOptionType;

    private constructor(options: Partial<Options>) {
        const defaultOption = {
            report: '',
            appId: '',
            userId: generateUserId(),
            sessionId: generateSessionId(),
            // PV 上报地址
            REPORT_PV: '',
            // UV 上报地址
            REPORT_UV: '',
            // 是否启动 PV
            isPageView: false,
            // 是否启动 UV
            isUniqueVisitor: false,
            // 是否启动性能指标
            isPerformance: false,
            // 是否启动网站指标
            isWebVitals: false,
            // 是否开启 Promise 错误上报
            isPromiseError: false,
            // 是否开启点击事件上报
            isClickEvent: false,
            // 是否开启屏幕录制
            isRecord: false,
            // 是否上报数据资源
            isResource: false
        };

        if (!options.report || !options.appId) {
            throw new Error('Configuration is required for the first initialization.');
        }

        this.options = {...defaultOption, ...options};
        this.options.REPORT_PV = `${this.options.report}/pv`;
        this.options.REPORT_UV = `${this.options.report}/uv`;
    }

    public static getInstance(options?: Options): ConfigManager {
        if (!ConfigManager.instance) {
            if (!options) {
                throw new Error('Configuration is required for the first initialization.');
            }
            ConfigManager.instance = new ConfigManager(options);
        }
        return ConfigManager.instance;
    }

    // 添加静态 get 方法
    public static get<K extends keyof ConfigOptionType>(key: K): ConfigOptionType[K] {
        return ConfigManager.getInstance().getOption(key);
    }

    getOption<K extends keyof ConfigOptionType>(key: K): ConfigOptionType[K] {
        return this.options[key];
    }

    setOption(key: string, value: any): void {
        // @ts-ignore
        this.options[key] = value;
    }

    getAllOptions(): ConfigOptionType {
        return this.options;
    }
}
