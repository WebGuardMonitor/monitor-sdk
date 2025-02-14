import {CompleteConfigTypes} from "@/types/config.types";
import {onPageUnload} from "@/helper/onPageUnload";
import {getBeaconTransport} from "@/utils/beacon";
import {constructorBatchReport} from "@/helper/constructorReport";
import {SenderTypes} from "@/types/sender.types";
import {RequestClient} from "@/utils/request";
import {BATCH_REPORT_PATH, REPORT_BATCH, REPORT_NOW} from "@/enum/constant";

type SenderImmediatelyType = typeof REPORT_NOW | typeof REPORT_BATCH

export class BatchSender extends RequestClient {
    private readonly MAX_DATA = 2;

    private data: SenderTypes[] = [];
    private config: CompleteConfigTypes;

    constructor(configs: CompleteConfigTypes) {
        super()
        this.config = configs;
    }

    /**
     * 数据上报
     * @param {any} data 上报数据
     * @param {SenderImmediatelyType} type 上报类型，默认 批量「REPORT_BATCH」
     */
    immediately(data: any, type: SenderImmediatelyType = REPORT_BATCH) {
        if (type === REPORT_NOW) {
            this.post(this.getEndpoint(), constructorBatchReport(data));
        } else {

            this.data.push(data);
            // console.log(JSON.stringify(this.data))
            if (this.data.length >= this.MAX_DATA) {
                this.report();
            }
        }
    }

    /**
     * 获取上报地址
     */
    getEndpoint(): string {
        return this.config.dsn + BATCH_REPORT_PATH as string;
    }

    /**
     * 获取批量上报数据
     */
    getBatchData() {
        if (!this.data) return;

        // const data = deepClone(this.data);
        // this.data = [];

        return constructorBatchReport(this.data);
    }

    report() {
        if (this.data.length === 0) return;

        const data = [...this.data]
        this.data = [];

        this.post(this.getEndpoint(), constructorBatchReport(data));
    }

    // 清空数据
    clear() {
        this.data = [];
    }
}


export const createBrowserSender = (configs: any) => {
    const sender = new BatchSender(configs);

    const beaconTransport = getBeaconTransport();

    // 监听页面是否关闭
    onPageUnload(() => {
        const data = sender.getBatchData();
        if (data) {
            sender.clear()
            beaconTransport.post(sender.getEndpoint(), data);
        }
    })

    return sender;
}