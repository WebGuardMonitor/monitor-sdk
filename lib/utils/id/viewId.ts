/**
 * 获取页面访问标识
 *
 * @return string
 */
export const getViewId = (): string => {
    return '__' + Date.now();
}