import {MonitorImplements} from "../../types";
import {createBrowserSender, getDeviceInfo, getLocalStorage, uuid} from "../../utils";
import {VISITOR_ID} from "../../common";
import Config from "../../config/config";

export class UniqueVisitorMonitor implements MonitorImplements {
    initialize() {
        console.log('来来老弟')

        // if (getLocalStorage(VISITOR_ID)) {
        //     return;
        // }

        const visitorId = uuid();
        localStorage.setItem(VISITOR_ID, visitorId);

        createBrowserSender.sendBeacon({
            url: Config.get('REPORT_UV'),
            data: getDeviceInfo()
        })
        return;
    }
}