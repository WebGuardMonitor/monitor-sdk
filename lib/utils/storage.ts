/**
 * 根据指定 key 获取本地存储
 * @param key
 */
export const getStorageItem = (key: string) => {
    const value = localStorage.getItem(key)

    if (value) {
        return value[0] === '{' ? JSON.parse(value) : value;
    }

    return ''
}

/**
 * 写入本地存储
 * @param {string} key
 * @param {string|object} value
 */
export const setStorageItem = (key: string, value: string | object) => {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, stringValue);
}

/**
 * 删除本地存储
 * @param key
 */
export const removeStorageItem = (key: string) => {
    localStorage.removeItem(key);
}