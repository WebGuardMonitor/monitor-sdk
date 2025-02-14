import {BaseOptionsFieldsTypes} from "@/types/baseOptionsTypes";
import {getDeviceId, getPageId, getSessionId, getUserId, getViewId, WINDOW} from "@/utils";
import {version} from "@/version";
import {CompleteConfigTypes, ConfigTypes, ReportConfigTypes} from "@/types/config.types";
import {deepClone} from "@/utils/deepClone";


export class createBrowserConfigManager {

    // 默认配置项
    private defaultConfig: ConfigTypes;

    private customConfig: BaseOptionsFieldsTypes = {};

    // 合并的配置项目
    private config: CompleteConfigTypes | undefined;

    constructor() {
        this.defaultConfig = this.createDefaultConfig();
    }

    /**
     * 设置配置
     * @param configs
     */
    setConfig(configs: BaseOptionsFieldsTypes = {}) {

        this.customConfig = configs;

        if (!configs.dsn) {
            throw new Error('未检测到配置的上报地址。')
        }

        if (!configs.app_id) {
            throw new Error('未检测到配置的监控应用ID。请检查您的配置文件或前往设置页面进行添加。')
        }

        // this.config = {
        //     ...this.defaultConfig,
        //     ...configs
        // }
        this.config = Object.assign({}, this.defaultConfig, configs)

    }

    /**
     * 创建默认配置
     */
    createDefaultConfig(): ConfigTypes {

        const {
            hash,
            host,
            hostname,
            href,
            origin,
            pathname,
            port,
            protocol
        } = WINDOW.location;

        const {
            appCodeName,
            appName,
            appVersion,
            language,
            platform,
            product,
            productSub,
            userAgent,
            vendor,
            connection
        } = WINDOW.navigator;

        return {
            // 页面 ID
            page_id: getPageId(),
            // 页面访问标识，用来统计页面 ID次数
            view_id: getViewId(),
            // 会话 ID
            session_id: getSessionId(),
            // 设备 ID
            device_id: getDeviceId(),
            // 用户 ID
            user_id: getUserId(),
            // 部署版本, 格式：release.{SDK 版本}，release.0.0.1
            release: `release.${version}`,
            // 环境 production,development
            env: 'production',
            // 时间
            timestamp: Date.now(),

            // 环境信息
            hash,
            host,
            hostname,
            href,
            origin,
            pathname,
            port,
            protocol,
            appCodeName,
            appName,
            appVersion,
            language,
            platform,
            product,
            productSub,
            userAgent,
            vendor,
            network_type: connection.effectiveType
        }
    }

    /**
     * 获取配置项
     */
    getConfig(): CompleteConfigTypes {
        return this.config as CompleteConfigTypes;
    }

    getReportConfig(): ReportConfigTypes {
        const config = deepClone(this.config) as CompleteConfigTypes;
        delete config.dsn;
        delete config.maxBreadcrumbs;
        config.timestamp = Date.now();
        // @ts-ignore
        return config;
    }

    /**
     * 刷新 Config
     */
    refreshConfig() {
        console.log('ssss')
        this.defaultConfig = this.createDefaultConfig();
        this.config = Object.assign(this.defaultConfig, this.customConfig)
    }
}

const createConfigManager = new createBrowserConfigManager()

/**
 * 配置管理
 */
export const configManager = {
    setConfig: (config: BaseOptionsFieldsTypes) => {
        createConfigManager.setConfig(config)
    },
    getConfig: (): CompleteConfigTypes => {
        return createConfigManager.getConfig()
    },
    getReportConfig: (): ReportConfigTypes => {
        return createConfigManager.getReportConfig()
    },
    refreshConfig: () => {
        return createConfigManager.refreshConfig();
    }
}