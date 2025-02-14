import {getStorageItem, md5, setStorageItem, WINDOW} from "@/utils";
import {PAGE_VIEW} from "@/enum/constant";

/**
 * 获取页面 ID
 * @return string
 */
export const getPageId = (): string => {
    let storagePageId = getStorageItem(PAGE_VIEW);

    if (!storagePageId) {
        storagePageId = md5(WINDOW.location.href);
        setStorageItem(PAGE_VIEW, storagePageId)
    }

    return storagePageId;
}
