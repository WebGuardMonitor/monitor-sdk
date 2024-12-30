import {WINDOW} from "../types";
import {USER_ID} from "../common";

/**
 * 生成 User ID
 */
export const generateUserId = () => {
    let userId: string = window.localStorage.getItem(USER_ID) ?? '';

    if (!userId) {
        userId = `v4-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`;
        WINDOW.localStorage.setItem(USER_ID, userId)
    }

    return userId;
};