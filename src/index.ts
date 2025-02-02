import {
    BreadcrumbMonitorPlugin,
    FetchMonitorPlugin,
    JsErrorMonitorPlugin,
    PageViewPlugin,
    PerformanceMonitorPlugin,
    PerformanceTimingPlugin,
    PromiseMonitorPlugin,
    ResourceMonitorPlugin,
    StayTimeMonitorPlugin,
    UserViewPlugin,
    XhrMonitorPlugin
} from "@/plugins";
import {Config} from "../types/config";

class TraceSDK {
    private plugins: Map<string, Function> = new Map()

    constructor(config: Config) {

        // 初始化配置项

        // 初始化注册插件
        this.registerPlugins();

        this.init();
    }

    /**
     * 注册插件
     */
    registerPlugins() {

        const plugins = [
            // PV
            {name: 'PageViewPlugin', plugin: PageViewPlugin},
            // UV
            {name: 'UserViewPlugin', plugin: UserViewPlugin},
            // 用户行为操作
            {name: 'BreadcrumbMonitorPlugin', plugin: BreadcrumbMonitorPlugin},
            // 新老旧 performanceTiming
            {name: 'PerformanceTimingPlugin', plugin: PerformanceTimingPlugin},
            // 性能指标数据，FP、FCP、LCP、CLS、FID、TTFB、以及页面加载瀑布时间轴数据
            {name: 'PerformanceMonitorPlugin', plugin: PerformanceMonitorPlugin},
            // JS 错误 - 资源数据错误
            {name: 'JsErrorMonitorPlugin', plugin: JsErrorMonitorPlugin},
            // Promise 错误
            {name: 'PromiseMonitorPlugin', plugin: PromiseMonitorPlugin},
            // css、link、img、script、iframe、audio、video、source 数据资源加载
            {name: 'ResourceMonitorPlugin', plugin: ResourceMonitorPlugin},
            // xhr 请求
            {name: 'XhrMonitorPlugin', plugin: XhrMonitorPlugin},
            // fetch 请求
            {name: 'FetchMonitorPlugin', plugin: FetchMonitorPlugin},
            // 页面停留时长
            {name: 'StayTimeMonitorPlugin', plugin: StayTimeMonitorPlugin}
        ]

        plugins.forEach(({name, plugin}) => {
            this.plugins.set(name, plugin)
        })

    }


    init() {
        this.plugins.forEach(plugin => {
            // @ts-ignore
            new plugin().initialize()
        })
    }
}

(globalThis as any).TraceSDK = TraceSDK;

export {TraceSDK}