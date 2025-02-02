import {Plugin} from "../../types/plugin";

export class StayTimeMonitorPlugin implements Plugin {
    name = 'StayTimeMonitorPlugin';

    initialize() {
        console.log('StayTimeMonitorPlugin initialize');
    }
}