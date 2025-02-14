import {uuid} from "@/utils/uuid";

/**
 * 获取每次页面的会话 ID
 *
 * @return string
 */
export const getSessionId = (): string => {
    return uuid()
}