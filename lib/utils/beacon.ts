import {WINDOW} from "@/utils/worldwide";

/**
 * 获取浏览器的 beacon transport
 *
 * @link https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon
 */
export const getBeaconTransport = () => {
    return WINDOW && WINDOW.navigator.sendBeacon ? {
        get: () => {
        },
        post: (url: string, data: any) => {
            // const blob = new Blob([JSON.stringify(data)], {
            //     type: 'application/json; charset=UTF-8',
            // });
            WINDOW.navigator.sendBeacon(url, JSON.stringify(data))
        }
    } : {
        get: () => {
        },
        post: () => {
        }
    }
}