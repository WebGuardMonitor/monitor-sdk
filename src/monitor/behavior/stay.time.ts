import {MonitorImplements, WINDOW} from "../../types";
import {whenVisible} from "../../helper/whenVisible";
import {onHidden} from "../../helper/onHidden";
import {whenReady} from "../../helper/whenReady";
import {constructReportData} from "../../helper/BasicData";
import {STAY_TIME_TYPE} from "../../common";

export class StayTime implements MonitorImplements {
    private timer: number = 0;


    initialize() {

        whenReady(() => {
            this.setTime()
        })

        onHidden(() => {

            const endTime = Date.now();

            const millis = endTime - this.timer;

            const data = {
                startTime: this.timer,
                endTime,
                duration: Math.floor(millis / 1e3),
                href: WINDOW.location.href
            }

            WINDOW.Sender.push(constructReportData(STAY_TIME_TYPE, data))

        }, false)


        whenVisible(() => {
            this.setTime()
        });


    }

    setTime() {
        this.timer = Date.now();
    }
}