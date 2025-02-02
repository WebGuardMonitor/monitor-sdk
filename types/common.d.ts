/**
 * 基础数据
 */
export interface Common {
    // 应用 ID
    app_id: string;
    // 页面 ID
    page_id: string;
    // 页面访问标识 ID
    view_id: string;
    // 用户 ID
    user_id: string;
    // 设备 ID
    device_id: string;
    // 会话 ID
    session_id: string;
    // 链路 ID
    trace_id: string;

    // 部署版本，
    release: string;
    // 环境
    env: string;
    // 时间
    timestamp: number;

    // 浏览器信息
    user_agent: string;
    // 平台
    platform: string;
    // 系统
    os: {
        name: string,
        version: string
    };
    // 语言
    language: string;
    // 浏览器
    browser: string;
    // 设备
    device: string;

    // 地址
    url: string;
    // 地址端口
    port: number;
    // 地址协议
    protocol: string;
}