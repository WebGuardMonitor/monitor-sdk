import {createClient} from "@/core/client";
import {BaseOptionsFieldsTypes} from "@/types/baseOptionsTypes";
import {PerformanceTimingMonitorPlugin} from "@/browser/plugins/performance/performance.timing";
import {PageViewMonitorPlugins} from "@/browser/plugins/behavior/page.view";
import {DocumentMonitorPlugin} from "@/browser/plugins/document";
import {StayTimeMonitorPlugin} from "@/browser/plugins/behavior/stay.time";
import {ConsoleMonitorPlugin} from "@/browser/plugins/replace/console";
import {JsErrorMonitorPlugin} from "@/browser/plugins/exception/js.error";
import {PromiseMonitorPlugin} from "@/browser/plugins/exception/promise.error";
import {XhrMonitorPlugin} from "@/browser/plugins/replace/xhr.replace";
import {FetchMonitorPlugin} from "@/browser/plugins/replace/fetch.replace";
import {ResourceTimingMonitorPlugin} from "@/browser/plugins/performance/source.performance";
export {version} from "@/version";


/**
 * 创建浏览器端客户端
 * @param config
 */
const createBrowserClient = (config: BaseOptionsFieldsTypes) => {

    const plugins = [
        // 行为数据
        {name: 'page.history', plugin: PageViewMonitorPlugins},// 页面跳转行为记录
        {name: 'dom', plugin: DocumentMonitorPlugin},// 点击事件记录
        {name: 'stay_time', plugin: StayTimeMonitorPlugin},// 页面停留时长记录
        {name: 'console', plugin: ConsoleMonitorPlugin},// console 打印

        // 异常数据
        {name: 'js_error', plugin: JsErrorMonitorPlugin}, // JS 错误监控，含资源加载错误
        {name: 'promise', plugin: PromiseMonitorPlugin}, // Promise 错误监控
        {name: 'http_xhr', plugin: XhrMonitorPlugin}, // Xhr 监听
        {name: 'http_fetch', plugin: FetchMonitorPlugin}, // Fetch 监听
        {name: 'resource', plugin: ResourceTimingMonitorPlugin}, // 资源加载监控
        // {name: 'websocket', plugin: ''},

        // 性能数据
        {name: 'performance', plugin: PerformanceTimingMonitorPlugin}, // 浏览器性能数据指标监控
    ]

    createClient(config, plugins)
}

export const init = createBrowserClient;
