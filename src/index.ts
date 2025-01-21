import {Options} from './types';
import Config from './config/config';
import {generateDeviceId} from './utils';
import {EventComposite} from './helper/EventComposite';
import {PageViewMonitor, PerformanceMonitor, UniqueVisitorMonitor, WebVitalsMonitor} from "./monitor";
import {DomMonitor} from "./monitor/behavior/dom";

class TraceSDK {
    public readonly version: string = '1.0.1';
    private event: EventComposite;

    constructor(options: Options) {
        console.log('监控构造中...');
        // 配置信息
        Config.init(options);

        // 写入设备指纹 ID
        generateDeviceId();

        this.event = this.registerEvent();

        this.init();
    }

    /**
     * 初始化
     * @private
     */
    private init() {
        this.event.init();
        console.log(Config.getAll())
    }

    /**
     * 注册事件
     * @private
     */
    private registerEvent(): EventComposite {
        const event = new EventComposite();

        // PV 上报
        if (Config.get('initPV')) {
            event.register(new PageViewMonitor());
        }

        // UV 上报
        if (Config.get('initUV')) {
            event.register(new UniqueVisitorMonitor());
        }

        // performance 时长总线上报
        if (Config.get('initPerformance')) {
            event.register(new PerformanceMonitor())
        }

        // 网站性能数据指标上报
        if (Config.get('initWebVitals')) {
            event.register(new WebVitalsMonitor())
        }

        // Js Error 错误上报
        // Promise 错误上报
        // 异常请求错误上报 xhr、fetch、
        // 资源数据上报
        // 点击事件上报
        if (Config.get('initClick')) {
            event.register(new DomMonitor())
        }
        // 滚动事件
        // 页面停留数据上报
        // 页面跳转
        //


        return event;
    }
}

(globalThis as any).TraceSDK = TraceSDK;
