import {Subscribe} from "@/core/subscribe";
import {Breadcrumb} from "@/core/breadcrumb";

export abstract class BaseClient {
    private readonly subscribe: Subscribe;

    // private readonly config: ConfigManager;

    protected breadcrumb: Breadcrumb;

    // protected pluginManage: PluginManage;

    protected constructor(options: any) {
        // 初始化配置文件
        // this.config = new ConfigManager();
        this.subscribe = new Subscribe();

        // 初始化用户行为操作
        this.breadcrumb = new Breadcrumb();
        // 初始化插件
        // this.pluginManage = new PluginManage()
    }

    /**
     * 插件注册
     * @param plugins
     */
    register(plugins: any[]) {
        plugins.forEach(item => {
            item.plugin(this.subscribe)
        })
    }
}