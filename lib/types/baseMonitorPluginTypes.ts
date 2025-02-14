import {ClientTypes} from "@/types/clientTypes";

export interface BaseMonitorPluginTypes {
    new(): {
        // [key: string]: (client: ClientTypes) => void,
        initialize: (client: ClientTypes) => void
    };
}


export interface BasePluginTypes {
    name: string;
    plugin: BaseMonitorPluginTypes;
}