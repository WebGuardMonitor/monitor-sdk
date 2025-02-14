import {construct, crush} from "radash";

// 深拷贝
export const deepClone = (data: any) => {
    return construct(crush(data));
}