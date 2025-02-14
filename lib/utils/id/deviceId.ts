import {uuid} from "@/utils/uuid";

/**
 * 获取设备 ID
 * @return string
 */
export const getDeviceId = () => {
    return uuid();
};