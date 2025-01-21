import {MonitorImplements, WINDOW} from "../../types";
import {uuid} from "../../utils";
import {bindReporter} from "../../helper/bindReporter";
import {BATCH_TYPE, CLICK_EV_TYPE} from "../../common";
import {constructReportData} from "../../helper/BasicData";

type ClickType = Event | MouseEvent | TouchEvent;

export class DomMonitor implements MonitorImplements {
    // 上报事件数据数量
    private readonly MAX_EVENTS = 30;
    // 存储点击事件的数组
    private events: any[] = [];

    private readonly DEBOUNCE_DELAY = 300; // 防抖延迟时间（毫秒）

    initialize() {
        // const eventTypes = ['click', 'mousedown', 'mouseup', 'touchstart', 'touchend'];
        // eventTypes.forEach(addListener);

        if (typeof window.addEventListener === 'function') {
            WINDOW.addEventListener('click', (event: ClickType) => {
                this.handleClick(event)
            }, false)
        } else if (typeof (window as any).attachEvent === 'function') {
            (document as any).attachEvent('onclick', (event: ClickType) => {
                this.handleClick(event)
            }, false)
        }
        // const addListener = () => {
        //     WINDOW.addEventListener('beforeunload', (event: ClickType) => {
        //         // debounce({delay: this.DEBOUNCE_DELAY}, () => {
        //         this.handleClick(event)
        //         // });
        //     });
        //     WINDOW.addEventListener('unload', (event: ClickType) => {
        //         // debounce({delay: this.DEBOUNCE_DELAY}, () => {
        //         this.handleClick(event)
        //         // });
        //     });
        //
        // }
    }


    /**
     * 获取点击事件的数据
     * @param event
     */
    handleClick(event: ClickType) {
        const target = event.target as HTMLElement;

        const clickEvent = {
            timestamp: new Date().toISOString(),
            tagName: target.tagName,
            id: uuid(),
            className: target.className || null,
            innerText: target.innerText || null,
            x: event?.clientX,
            y: event?.clientY,
            pageX: event?.pageX,
            pageY: event?.pageY,
            screenX: event?.screenX,
            screenY: event?.screenY,
            // win: JSON.stringify(WINDOW)
        }

        this.events.push(constructReportData(CLICK_EV_TYPE, clickEvent))

        if (this.events.length >= this.MAX_EVENTS) {
            this.reportEvents();
        }

    }

    /**
     * 封装事件上报
     */
    reportEvents() {
        if (this.events.length === 0) return

        const clicksToReport = [...this.events]
        this.events = []
        // console.log('数据要上报咯', clicksToReport)

        bindReporter(constructReportData(BATCH_TYPE, clicksToReport))
    }
}