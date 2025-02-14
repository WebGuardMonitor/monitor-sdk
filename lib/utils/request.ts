import {MethodType} from "@/types";

const xhrTransport = (method: MethodType, url: string, data: Document | XMLHttpRequestBodyInit | null) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(data);
};

export class RequestClient {
    get(url: string, data: any) {
        xhrTransport('get', url, JSON.stringify(data))
    }

    post(url: string, data: any) {
        xhrTransport('post', url, JSON.stringify(data))
    }
}

export const request = new RequestClient();