export class Subscribe {

    // // 事件列表
    // private eventMap: Map<String, Function> = new Map()
    //
    // constructor() {
    // }
    //
    // /**
    //  * 事件曝光
    //  * @param eventName
    //  * @param callback
    //  */
    // emit(eventName: String) {
    //     this.eventMap.set(eventName, () => {
    //     })
    // }
    //
    // /**
    //  * 订阅事件
    //  * @param name
    //  */
    // on(name: string) {
    //     const handle = this.eventMap.get(name)
    //
    //     if (handle) {
    //         handle()
    //     }
    // }

    private eventMap: Map<String, Function> = new Map()

    on(eventName: string, callback: () => void) {
        console.log('注册了', eventName)
        this.eventMap.set(eventName, callback)
    }

    // 触发时间
    emit(eventName: string) {
        const handle = this.eventMap.get(eventName)
        if (handle) {
            handle()
        }
    }

    off(eventName: string) {
        this.eventMap.delete(eventName)
    }

    once(eventName: string, callback: () => void) {
        const handler = () => {
            callback();
            this.off(eventName);
        }

        this.on(eventName, handler)
    }
}