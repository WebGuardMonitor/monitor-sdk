import {ClientTypes} from "@/types/clientTypes";

export abstract class BaseMonitorPlugin {

    /**
     * 插件初始化
     */
    abstract initialize(client: ClientTypes): void;
}