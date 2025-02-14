import {traceIdentifier} from "@/utils/traceId/index";
import {md5} from "@/utils";

/**
 * 构造异常错误链路 ID
 * @param {string} type 异常类型
 * @param {string} message 错误信息
 * @param {string} filename 文件
 * @param {number} row 错误行
 * @param {number} columns 错误列
 */
export const buildErrorTraceId = (type: string, message: string, filename: string, row: number, columns: number): string => {

    const code = md5(`${type}-${message}-${filename}-${row}-${columns}`);

    return [
        traceIdentifier,
        code
    ].join('-');
}

/**
 * 构造资源加载错误链路 ID
 * @param {string} tag HTML 标签
 * @param {string} src 资源地址
 */
export const buildResourceErrorTraceId = (tag: string, src: string): string => {

    const code = md5(`${tag}-${src}`);

    return [
        traceIdentifier,
        code
    ].join('-');
}

/**
 * 构造 Promise 错误链路 ID
 * @param message
 */
export const buildPromiseErrorTraceId = (message: string) => {

    const code = md5(`${message}`);

    return [
        traceIdentifier,
        code
    ].join('-');
}

/**
 * 构造请求错误链路 ID
 * @param method
 * @param url
 * @param headers
 * @param status
 * @param statusText
 */
export const buildRequestErrorTraceId = (method: string, url: string, headers: object, status: number, statusText: string): string => {
    const timestamp = Date.now();

    const code = md5([
        method,
        url,
        headers,
        status,
        statusText
    ].join('-'));

    return [
        traceIdentifier,
        timestamp,
        code
    ].join('-');
}

export const buildConsoleTraceId = (type: string, params: any): string => {
    const code = md5([
        type,
        JSON.stringify(params)
    ].join('-'));

    return [
        traceIdentifier,
        code
    ].join('-')
}