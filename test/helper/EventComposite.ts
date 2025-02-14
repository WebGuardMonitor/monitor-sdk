import { MonitorImplements } from '../types';

/**
 * 使用事件组合模式，将所有事件进行统一初始化
 */
export class EventComposite {
    private eventList: MonitorImplements[] = [];

    /**
     * 注册事件
     * @param event
     */
    register(event: MonitorImplements) {
        this.eventList.push(event);
    }

    /**
     * 初始化所有事件
     */
    init() {
        this.eventList.forEach((item) => item.initialize());
    }
}
