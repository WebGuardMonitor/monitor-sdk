import {WINDOW} from "../types";
import {md5} from "./md5";

/**
 * 生成所在的页面 ID
 *
 * @return string
 */
export const generatePageId = (): string => {
    return md5(WINDOW.location.href);
}