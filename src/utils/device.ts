import FingerprintJS from '@fingerprintjs/fingerprintjs';
import {WINDOW} from "../types";
import {UAParser} from 'ua-parser-js';


/**
 * 生成设备 ID
 */
export const generateDeviceId = () => {
    FingerprintJS.load()
        .then(fp => {
            fp.get()
                .then(result => {
                    // result 包含了唯一的浏览器指纹
                    // console.log(result)
                    // console.log(result.visitorId)
                    WINDOW.DeviceFingerprintId = result.visitorId
                });
        });
}

/**
 * 获取设备信息
 */
export const getDeviceInfo = () => {
    const {
        browser,
        cpu,
        device,
        engine,
        os
    } = UAParser(WINDOW.navigator.userAgent);

    return {
        // 当前浏览器的用户代理
        userAgent: WINDOW.navigator.userAgent,
        // 设备的操作系统平台
        platform: WINDOW.navigator.platform || WINDOW.navigator.userAgentData.platform,
        // 语言
        language: WINDOW.navigator.language,
        // 语言集
        languages: WINDOW.navigator.languages.join(','),
        // 浏览器的产品名称
        product: WINDOW.navigator.product,
        // 浏览器供应商的名称
        vendor: WINDOW.navigator.vendor,
        browser: browser.name,
        version: browser.version,
        cpu,
        device: device.vendor,
        engine: {
            name: engine.name,
            version: engine.version
        },
        os: {
            name: os.name,
            version: os.version
        },

        // 屏幕窗口
        // screen: {
        screenWidth: screen.width,
        screenHeight: screen.height,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,


        host: location.host,
        hostname: location.hostname,
        href: location.href,
        origin: location.origin,
        pathname: location.pathname,
        port: Number(location.port),
        protocol: location.protocol
    }
}