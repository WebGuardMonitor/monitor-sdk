import {onINP} from "web-vitals";
import {bindReporter} from "../../../helper/bindReporter";
import {VITALS_INP} from "../../../common";

export const initINP = () => {
    onINP((metric) => {
        bindReporter({
            name: VITALS_INP,
            metric: metric.value,
            entry: metric.entries,
            vitals: metric
        })
    })
}