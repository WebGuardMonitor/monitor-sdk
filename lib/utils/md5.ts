import {Md5} from 'md5-typescript';

/**
 * MD5 编码
 * @param string
 */
export const md5 = (string: any) => {
    return Md5.init(string);
};
