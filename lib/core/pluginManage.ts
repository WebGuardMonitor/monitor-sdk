import {GlobalClient} from "@/core/client";
import {configManager} from "@/core/config";
import {BaseOptionsFieldsTypes} from "@/types/baseOptionsTypes";
import {version} from "@/version";
import {BaseMonitorPluginTypes} from "@/types/baseMonitorPluginTypes";


/**
 * 插件管理
 */
export class PluginManage {
    private plugins = new Map();

    constructor(config: BaseOptionsFieldsTypes) {
        configManager.setConfig(config);
        this.plugins = new Map()
    }

    /**
     * 插件注册
     *
     * @param {string} name 插件名称
     * @param {BaseMonitorPluginTypes} plugin 插件函数，约定好得插件函数
     */
    register(name: string, plugin: BaseMonitorPluginTypes) {
        this.plugins.set(name, plugin)
    }

    /**
     * 运行插件
     */
    initPlugins() {
        const client = Reflect.construct(GlobalClient, []);
        this.plugins.forEach((plugin: BaseMonitorPluginTypes) => {
            Reflect.construct(plugin, []).initialize(client);
            // plugin.prototype.initialize.call(Reflect.construct(plugin, []), client)
        })
        console.info('[MonitorTracer] init successfully! version: ', version)
    }
}