import { Md5 } from 'md5-typescript';

export const md5 = (string: any) => {
    return Md5.init(string);
};
