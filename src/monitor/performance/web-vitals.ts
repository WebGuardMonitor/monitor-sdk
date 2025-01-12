import {MonitorImplements} from "../../types";
import {initTTFB} from "./web-vitals/initTTFB";
import {initLCP} from "./web-vitals/initLCP";
import {initINP} from "./web-vitals/initINP";
import {initFCP} from "./web-vitals/initFCP";
import {initFID} from "./web-vitals/initFID";
import {initCLS} from "./web-vitals/initCLS";
import {initFP} from "./web-vitals/initFP";

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
        console.log('TODO 获取 FMP、SI、TBT、TTi、DCL、Load、FPS 数据指标')

        // FMP
        // SI
        // TBT
        // TTi
        // DCL
        // Load
        // FPS

        // TODO  FPS 单独获取

        // TODO 以下指标以成功获取
        initFP()
        initCLS()
        initFCP()
        initFID()
        initINP()
        initLCP()
        initTTFB()
    }
}