import {Options} from './types';
import Config from './config/config';
import {generateDeviceId} from './utils';
import {EventComposite} from './helper/EventComposite';
import {PageViewMonitor, PerformanceMonitor, UniqueVisitorMonitor, WebVitalsMonitor} from "./monitor";

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
    }

    /**
     * 注册事件
     * @private
     */
    private registerEvent(): EventComposite {
        const event = new EventComposite();

        // PV 上报
        event.register(new PageViewMonitor());
        // UV 上报
        event.register(new UniqueVisitorMonitor());

        // performance 时长总线上报
        event.register(new PerformanceMonitor())

        // 网站性能数据指标上报
        event.register(new WebVitalsMonitor())

        return event;
    }
}

(globalThis as any).TraceSDK = TraceSDK;
