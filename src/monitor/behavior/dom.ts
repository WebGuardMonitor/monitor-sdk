import {MonitorImplements, WINDOW} from "../../types";
import {uuid} from "../../utils";
import {CLICK_EV_TYPE} from "../../common";
import {constructReportData} from "../../helper/BasicData";

type ClickType = MouseEvent;

export class DomMonitor implements MonitorImplements {

    // 防抖延迟时间（毫秒）
    private readonly DEBOUNCE_DELAY = 300;

    initialize() {
        // const eventTypes = ['click', 'mousedown', 'mouseup', 'touchstart', 'touchend'];
        // eventTypes.forEach(addListener);

        if (typeof window.addEventListener === 'function') {

            WINDOW.addEventListener('click', (event: ClickType) => {
                this.handleClick(event)
            }, false)

            // TODO 监听 keypress

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

        WINDOW.Sender.push(constructReportData(CLICK_EV_TYPE, clickEvent))

    }
}