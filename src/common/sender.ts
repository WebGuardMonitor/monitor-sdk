import { bindReporter } from '../helper/bindReporter';
import { constructReportData } from '../helper/BasicData';
import { BATCH_TYPE } from './constant';

export class Sender {
    // 数据存储
    private data: any[] = [];

    // 最大数据存储量
    private readonly MAX_DATA = 8;

    constructor() {
        this.data = [];
    }

    /**
     * 添加数据
     * @param data
     */
    push(data: any) {
        console.log('上报的数据来咯', data);
        this.data.push(data);

        if (this.data.length >= this.MAX_DATA) {
            this.report();
        }
    }

    /**
     * 获取上报数据
     */
    getReportData() {
        return this.data;
    }

    /**
     * 数据上报
     */
    public report() {
        if (this.data.length === 0) return;

        const reportData = [...this.data];
        this.data = [];

        bindReporter(constructReportData(BATCH_TYPE, reportData));
    }
}
