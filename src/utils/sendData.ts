import {EventType, MethodOptions, MethodType, WINDOW} from '../types';
import Config from "../config/config";
import {joinQueryWithMap} from "./index";

/**
 * 发生上报数据
 * @param evType 上报类型
 * @param data 上报的数据
 */
export const sendData = (evType: EventType, data: Object | Array<object>) => {
    setTimeout(() => {
        console.log({
            ev_type: evType,
            payload: data,
        }, WINDOW.DeviceFingerprintId)
    }, 10)

    // // 优先使用 sendBeacon ，但是他有发送上限 data 最大
    // if (WINDOW.navigator.sendBeacon) {
    //
    //     WINDOW.navigator.sendBeacon('https://www.baidu.com', JSON.stringify(data));
    //
    // } else {
    //     sendDataUsingXHR()
    // }
};

const createBrowserSender = {
    __request(method: MethodType, url: string, data: Document | XMLHttpRequestBodyInit | null) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(data);
    },
    sendHttp() {
        return {
            get(option: MethodOptions) {
                const url = option.url + '?' + joinQueryWithMap(option.data);
                console.log(url)
                createBrowserSender.__request(option.method, url, null)
            },
            post(data: Object | Array<Object>) {
                // createBrowserSender._request(METHOD_POST, data)
            }
        }
    },
    sendBeacon(data: Object | Array<Object>) {
        WINDOW.navigator.sendBeacon(Config.get('report'), JSON.stringify(data));
    },

}

export {
    createBrowserSender
}