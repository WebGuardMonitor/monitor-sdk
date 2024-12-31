import {MonitorImplements} from "../../types";
import {createBrowserSender} from "../../utils";
import {getReportUrl} from "../../helper/BasicUrl";
import {onFP} from "./web-vitals/onFP";

const VitalsStatus = {
    fp: false,
    fcp: false,
    fmp: false,
    lcp: false,
    fid: false,
    si: false,
    tbt: false,
    inp: false,
    cls: false,
    tti: false,
    ttfb: false,
    dcl: false,
    load: false
}

export class WebVitalsMonitor implements MonitorImplements {
    initialize() {
        // TODO: 添加 Web Vitals 监控逻辑
        console.log('TODO 获取 FP、FCP、FMP、LCP、FID、SI、TBT、INP、CLS、TTi、TTFB、DCL、Load、FPS 数据指标')
        onFP(() => {
            console.log('FP')
        })

        createBrowserSender.sendHttp().post({
            url: getReportUrl(),
            data: {
                fp: 0,
                fcp: 0,
                fmp: 0,
                lcp: 0,
                fid: 0,
                si: 0,
                tbt: 0,
                inp: 0,
                cls: 0,
                tti: 0,
                ttfb: 0,
                dcl: 0,
                load: 0,
            }
        })

        // TODO  FPS 单独获取
    }
}