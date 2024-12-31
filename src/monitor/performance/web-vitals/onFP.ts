import {whenActivated} from "../../../helper/whenActivated";

export const onFP = (onReport: () => void) => {
    whenActivated(() => {
        onReport()
    })
}