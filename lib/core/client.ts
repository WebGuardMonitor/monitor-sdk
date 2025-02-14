import {PluginManage} from "@/core/pluginManage";
import {BaseOptionsFieldsTypes} from "@/types/baseOptionsTypes";
import {configManager} from "@/core/config";
import {Breadcrumb} from "@/core/breadcrumb";
import {BasePluginTypes} from "@/types/baseMonitorPluginTypes";
import {createBrowserSender} from "@/core/batchSender";

/**
 * 建立全局连接
 */
export class GlobalClient {
    /**
     * 配置项目
     */
    config = configManager.getConfig()
    /**
     * 行为数据
     */
    breadcrumb = new Breadcrumb()
    /**
     * 发送器
     */
    sender = createBrowserSender(this.config)
}

/**
 * 创建客户端连接
 * @param {BaseOptionsFieldsTypes} config 配置项
 * @param {BasePluginTypes} plugins 监控插件
 */
export const createClient = (config: BaseOptionsFieldsTypes, plugins: BasePluginTypes[]) => {
    console.log('创建连接', plugins);

    const plugin = new PluginManage(config)

    plugins.forEach((item: BasePluginTypes) => {
        plugin.register(item.name, item.plugin)
    })

    plugin.initPlugins();
}
