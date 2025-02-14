import {Breadcrumb} from "@/core/breadcrumb";
import {CompleteConfigTypes} from "@/types/config.types";
import {BatchSender} from "@/core/batchSender";

export interface ClientTypes {
    config: CompleteConfigTypes,
    breadcrumb: Breadcrumb,
    sender: BatchSender
}