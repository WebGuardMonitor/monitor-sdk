import { MonitorImplements } from '../../types';
import { createBrowserSender, getLocalStorage, uuid } from '../../utils';
import { VISITOR_ID } from '../../common';
import { buildBasicData } from '../../helper/BasicData';
import { getUvUrl } from '../../helper/BasicUrl';
import { createReporter } from '../../helper/createReporter';

export class UniqueVisitorMonitor implements MonitorImplements {
    initialize() {
        // console.log('来来老弟')

        if (getLocalStorage(VISITOR_ID)) {
            return;
        }

        const visitorId = uuid();
        localStorage.setItem(VISITOR_ID, visitorId);

        createReporter(() => {
            createBrowserSender.sendBeacon({
                url: getUvUrl(),
                data: buildBasicData(),
            });
        });

        return;
    }
}
