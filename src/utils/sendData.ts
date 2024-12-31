import {EventType, METHOD_GET, METHOD_POST, MethodOptions, MethodType, WINDOW} from '../types';
import {joinQueryWithMap} from './index';

export const sendData = (evType: EventType, data: Object | Array<object>) => {
    setTimeout(() => {
        console.log(
            {
                ev_type: evType,
                payload: data,
            },
            WINDOW.DeviceFingerprintId,
        );
    }, 10);

    // // 优先使用 sendBeacon ，但是他有发送上限 data 最大
    // if (WINDOW.navigator.sendBeacon) {
    //
    //     WINDOW.navigator.sendBeacon('https://www.baidu.com', JSON.stringify(data));
    //
    // } else {
    //     sendDataUsingXHR()
    // }
};


const _request = (method: MethodType, url: string, data: Document | XMLHttpRequestBodyInit | null) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(data);
}


/**
 * 创建发送器
 */
const createBrowserSender = {
    /**
     * 使用 XHR 发送数据
     */
    sendHttp() {
        return {
            get(option: MethodOptions) {
                const url = option.url + '?' + joinQueryWithMap(option.data);
                _request(METHOD_GET, url, null);
            },
            post(option: MethodOptions) {
                _request(METHOD_POST, option.url, option.data);
            },
        };
    },
    /**
     * 使用 sendBeacon 发送数据
     * @param option
     */
    sendBeacon(option: MethodOptions) {
        console.log('sendBeacon', JSON.stringify(option.data))
        WINDOW.navigator.sendBeacon(option.url, JSON.stringify(option.data));
    },
};

export {createBrowserSender};
