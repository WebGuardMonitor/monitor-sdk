import {MonitorImplements} from "../../types";
import {createBrowserSender} from "../../utils";
import {buildBasicData} from "../../helper/BasicData";
import {getPvUrl} from "../../helper/BasicUrl";
import {createReporter} from "../../helper/createReporter";

/**
 * 页面浏览量，即网站页面被查看的次数。每次页面被加载或刷新一次，PV 就会增加一次。
 */
export class PageViewMonitor implements MonitorImplements {
    initialize() {
        // console.log('胸戴，你又来了啊');

        createReporter(() => {
            createBrowserSender.sendHttp().get({
                url: getPvUrl(),
                data: buildBasicData()
            })
        })

    }
}