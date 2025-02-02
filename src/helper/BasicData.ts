import Config from '../config/config';
import { EventType, WINDOW } from '../types';
import { getDeviceInfo, uuid } from '../utils';

/**
 * 获取会话 ID
 */
export const getSessionId = () => {
    return Config.get('sessionId');
};

/**
 * 获取用户 ID
 */
export const getUserId = () => {
    return Config.get('userId');
};

/**
 * 获取设备 ID
 */
export const getDeviceId = () => {
    return WINDOW.DeviceFingerprintId;
};

/**
 * 构造基础上报数据
 */
export const buildBasicData = () => {
    return {
        ...{
            appId: Config.get('appId'),
            sessionId: getSessionId(),
            userId: getUserId(),
            deviceId: getDeviceId(),
            timestamp: Date.now(),
            traceId: uuid(),
        },
        ...getDeviceInfo(),
    };
};

/**
 * 构造上报数据
 *
 * @param evType
 * @param data
 */
export const constructReportData = (evType: EventType, data: Object) => {
    return {
        ev_type: evType,
        payload: data,
        common: buildBasicData(),
    };
};
