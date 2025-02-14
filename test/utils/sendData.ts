import { METHOD_GET, METHOD_POST, MethodOptions, MethodType } from '../types';
import { joinQueryWithMap } from './index';

const _request = (method: MethodType, url: string, data: Document | XMLHttpRequestBodyInit | null) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.setRequestHeader('sda', 'asdasd');
    xhr.send(data);
};

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
                _request(METHOD_POST, option.url, JSON.stringify(option.data));
            },
        };
    },
    /**
     * 使用 sendBeacon 发送数据
     * @param option
     */
    async sendBeacon(option: MethodOptions) {
        console.log('sendBeacon', JSON.stringify(option.data));
        // WINDOW.navigator.sendBeacon(option.url, JSON.stringify(option.data));
        await fetch(option.url, {
            method: METHOD_POST,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(option.data),
        });
    },
};

export { createBrowserSender };
