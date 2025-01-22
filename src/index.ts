import {Options} from './types';
import Config from './config/config';
import {generateDeviceId} from './utils';
import {EventComposite} from './helper/EventComposite';
import {
    DomMonitor,
    PageViewMonitor,
    PerformanceMonitor,
    PromiseErrorMonitor,
    UniqueVisitorMonitor,
    WebVitalsMonitor
} from "./monitor";
import {Sender} from "./common/sender";
import {version} from "./version";
import {Rrweb} from "./helper/rrweb";
import {Database} from "./common";

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
        console.log(Config.getAll())
    }

    /**
     * 注册事件
     * @private
     */
    private registerEvent(): EventComposite {
        const event = new EventComposite();

        // PV 上报
        if (Config.get('isPageView')) {
            event.register(new PageViewMonitor());
        }

        // UV 上报
        if (Config.get('isUniqueVisitor')) {
            event.register(new UniqueVisitorMonitor());
        }

        // performance 时长总线上报
        if (Config.get('isPerformance')) {
            event.register(new PerformanceMonitor())
        }

        // 网站性能数据指标上报
        if (Config.get('isWebVitals')) {
            event.register(new WebVitalsMonitor())
        }

        // Js Error 错误上报
        // Promise 错误上报
        if (Config.get('isPromiseError')) {
            event.register(new PromiseErrorMonitor())
        }
        // 异常请求错误上报 xhr、fetch、
        // 资源数据上报
        // 点击事件上报
        if (Config.get('isClickEvent')) {
            event.register(new DomMonitor())
        }
        // 滚动事件
        // 页面停留数据上报
        // 页面跳转
        //


        return event;
    }
}

(globalThis as any).DataBase = new Database();
(globalThis as any).Sender = new Sender();
(globalThis as any).TraceSDK = TraceSDK;
