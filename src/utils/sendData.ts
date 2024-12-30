import {EventType} from "../types";

/**
 * 发生上报数据
 * @param evType 上报类型
 * @param data 上报的数据
 */
export const sendData = (evType: EventType, data: Object) => {
    console.log({
        ev_type: evType,
        payload: data
    })
}