import {WINDOW} from "@/utils";
import {isObject} from "@/utils/is";

// @ts-ignore
export const getDefaultBrowser = () => {
    if (typeof window === 'object' && isObject(window))
        return window;

}

// @ts-ignore
export const getDefaultNavigator = () => {
    if (getDefaultBrowser() && 'navigator' in WINDOW) {
        return WINDOW.navigator;
    }
}

/**
 * 获取默认的浏览器连接信息
 */
// @ts-ignore
export const getDefaultNetworkInformation = () => {
    const navigator = getDefaultNavigator();
    if (navigator) {
        // @ts-ignore
        return navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    }
}