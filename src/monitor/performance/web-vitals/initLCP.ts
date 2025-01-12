import {onLCP} from "web-vitals";
import {VITALS_LCP} from "../../../common";
import {bindReporter} from "../../../helper/bindReporter";


export const initLCP = () => {

    onLCP((metric) => {
        bindReporter({
            name: VITALS_LCP,
            metric: metric.value,
            entry: metric.entries,
            vitals: metric
        })
    })
}