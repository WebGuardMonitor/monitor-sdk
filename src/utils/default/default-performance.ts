import {getDefaultBrowser} from "./default-browser";
import {isObject} from "../is";
import {WINDOW} from "../../types";

export const getDefaultPerformance = (): Performance | undefined => {
    if (getDefaultBrowser() && isObject(WINDOW.performance)) {
        return WINDOW.performance
    }

    return undefined;
}