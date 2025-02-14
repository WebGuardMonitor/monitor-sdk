import {BaseOptionsFieldsTypes} from "@/types/baseOptionsTypes";

export interface ConfigTypes {
    // 页面 ID
    page_id: string,
    // 页面访问标识，用来统计页面 ID次数
    view_id: string,
    // 会话 ID
    session_id: string,
    // 设备 ID
    device_id: string,
    // 用户 ID
    user_id: string,
    // 部署版本, 格式：release.{SDK 版本}，release.0.0.1
    release: string,
    // 环境 production,development
    env: string,
    // 时间
    timestamp: number,

    hash: string;
    host: string;
    hostname: string;
    href: string;
    origin: string;
    pathname: string;
    port: string;
    protocol: string;
    appCodeName: string;
    appName: string;
    appVersion: string;
    language: string;
    platform: string;
    product: string;
    productSub: string;
    userAgent: string;
    vendor: string;
    network_type: string;
}

export interface CompleteConfigTypes extends ConfigTypes, BaseOptionsFieldsTypes {
}

export interface ReportConfigTypes {
    app_id: string;
}