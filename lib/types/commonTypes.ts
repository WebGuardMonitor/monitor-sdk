import {EventType} from "@/types/evTypes";
import {CompleteConfigTypes} from "@/types/config.types";

export interface Common extends CompleteConfigTypes {
    // 链路 ID
    traceId: string,
}

// export interface CommonTypes {
//     ev_type: EventType;
//     payload: object;
//     common: () => Common;
// }
