import {Plugin} from "../../types/plugin";

export class BreadcrumbMonitorPlugin implements Plugin {
    name = 'BreadcrumbMonitorPlugin'

    initialize() {
        console.log('BreadcrumbMonitorPlugin initialize')
    }
}