import {MonitorImplements} from "../../types";

export class Breadcrumb implements MonitorImplements {
    constructor() {
        console.log('行为监控记录...');
    }

    initialize() {
        // [
        // window
        // 'languagechange',
        // 'devicemotion',
        // 'resize',
        // 'blur',
        // 'focus',
        // 'hashchange',
        // 'pagehide',
        // 'pageshow',
        // 'popstate',
        // 'beforeunload',
        // 'load',
        // 'unload',
        // 'rejectionhandled',
        // 'unhandledrejection',

        // document
        // 'scroll',
        // 'visibilitychange',
        // 'keypress',
        // 'keydown',
        // 'keyup',
        // 'DOMContentLoaded',
        // 'readystatechange',
        // ].forEach((eventName) => {
        //     // window.addEventListener(eventName, (event) => {
        //     //     console.log(eventName, event)
        //     // });
        // });
        window.addEventListener('click', (event) => {
            console.log('click', event)
        });
    }
}