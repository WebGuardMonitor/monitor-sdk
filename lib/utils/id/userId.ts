import {uuid} from "@/utils/uuid";

/**
 * 获取用户 ID
 *
 * @return string
 */
export const getUserId = (): string => {
    return uuid();
}