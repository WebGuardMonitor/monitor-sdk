import Config from "../config/config";

/**
 * 获取数据上报地址
 */
export const getReportUrl = () => {
    return Config.get('report') + '/report';
}

/**
 * 获取 PV 接口地址
 */
export const getPvUrl = () => {
    return Config.get('REPORT_PV');
}

/**
 * 获取 UV 接口地址
 */
export const getUvUrl = () => {
    return Config.get('REPORT_UV');
}