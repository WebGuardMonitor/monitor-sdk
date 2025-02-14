import { ConfigOptionType, Options } from './types';
import Config from './config/config';
import { generateDeviceId } from './utils';
import { EventComposite } from './helper/EventComposite';
import {
    Breadcrumb,
    DomMonitor,
    FetchMonitor,
    JsErrorMonitor,
    NavigationTimingMonitor,
    PageViewMonitor,
    PerformanceMonitor,
    PromiseErrorMonitor,
    ResourceTimingMonitor,
    StayTime,
    UniqueVisitorMonitor,
    WebVitalsMonitor,
    XhrMonitor,
} from './monitor';
import { Sender } from './common/sender';
import { version } from './version';
import { Rrweb } from './helper/rrweb';
import { Database } from './common';

class TraceSDK {
    public readonly version: string = version;

    private event: EventComposite;

    constructor(options: Options) {
        console.log('监控构造中...');
        // 配置信息
        Config.init(options);

        // 写入设备指纹 ID
        generateDeviceId();

        // 开启 rrweb 录制
        if (Config.get('isRecord')) {
            new Rrweb().init();
        }

        this.event = this.registerEvent();

        this.init();
    }

    /**
     * 初始化
     * @private
     */
    private init() {
        this.event.init();
    }

    /**
     * 注册事件
     * @private
     */
    private registerEvent(): EventComposite {
        const event = new EventComposite();

        event.register(new Breadcrumb());

        const plugins = [
            { key: 'breadcrumb', monitor: Breadcrumb },
            { key: 'isPageView', monitor: PageViewMonitor },
            { key: 'isUniqueVisitor', monitor: UniqueVisitorMonitor },
            { key: 'isPerformance', monitor: PerformanceMonitor },
            { key: 'isWebVitals', monitor: WebVitalsMonitor },
            { key: 'isJsError', monitor: JsErrorMonitor },
            { key: 'isPromiseError', monitor: PromiseErrorMonitor },
            { key: 'isXhr', monitor: XhrMonitor },
            { key: 'isFetch', monitor: FetchMonitor },
            { key: 'isResource', monitor: ResourceTimingMonitor },
            { key: 'isNavigationTiming', monitor: NavigationTimingMonitor },
            { key: 'isClickEvent', monitor: DomMonitor },
            { key: 'stay_time', monitor: StayTime },
        ];

        const config = Config.getAll() as ConfigOptionType;
        plugins.forEach((item) => {
            // @ts-ignore
            // if (config[item['key']]) {
            event.register(new item['monitor']());
            // }
        });
        // // PV 上报
        // if (Config.get('isPageView')) {
        //     event.register(new PageViewMonitor());
        // }

        // UV 上报
        // if (Config.get('isUniqueVisitor')) {
        //     event.register(new UniqueVisitorMonitor());
        // }

        // performance 时长总线上报
        // if (Config.get('isPerformance')) {
        //     event.register(new PerformanceMonitor())
        // }

        // 网站性能数据指标上报
        // if (Config.get('isWebVitals')) {
        //     event.register(new WebVitalsMonitor())
        // }

        // Js Error 错误上报
        // if (Config.get('isJsError')) {
        //     event.register(new JsErrorMonitor())
        // }

        // Promise 错误上报
        // if (Config.get('isPromiseError')) {
        //     event.register(new PromiseErrorMonitor())
        // }

        // XHR 数据上报
        // if (Config.get('isXhr')) {
        //     event.register(new XhrMonitor())
        // }

        // fetch 数据上报
        // if (Config.get('isFetch')) {
        //     event.register(new FetchMonitor())
        // }

        // 资源数据上报
        // if (Config.get('isResource')) {
        //     event.register(new ResourceTimingMonitor())
        // }

        // 耗时数据上报
        // if (Config.get('isNavigationTiming')) {
        //     event.register(new NavigationTimingMonitor())
        // }

        // 点击事件上报
        // if (Config.get('isClickEvent')) {
        //     event.register(new DomMonitor())
        // }

        // 页面停留数据上报
        // event.register(new StayTime())

        return event;
    }
}

export { Database, Sender, TraceSDK };

// 挂载到全局对象
if (typeof window !== 'undefined') {
    (globalThis as any).DataBase = new Database();
    (globalThis as any).Sender = new Sender();
    (globalThis as any).TraceSDK = TraceSDK;
}
