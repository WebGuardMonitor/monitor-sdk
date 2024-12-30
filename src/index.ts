import {Options, WINDOW} from "./types";
import {generateDeviceId, generateSessionId, generateUserId, getDeviceInfo} from "./utils";

export const init = (options: Options) => {

    // 获取浏览器设备指纹 ID
    generateDeviceId();

    const defaultOption = {
        report: '',
        appId: '',
        userId: generateUserId(),
        sessionId: generateSessionId()
    }

    // @ts-ignore
    WINDOW.option = {...defaultOption, ...options}

    console.log(WINDOW.option)
    console.log(getDeviceInfo())
}