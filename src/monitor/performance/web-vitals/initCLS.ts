import {onCLS} from "web-vitals";
import {bindReporter} from "../../../helper/bindReporter";
import {VITALS_CLS} from "../../../common";

export const initCLS = () => {
    onCLS((metric) => {
        bindReporter({
            name: VITALS_CLS,
            metric: metric.value,
            entry: metric.entries,
            vitals: metric
        })
    })
}