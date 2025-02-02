import { eventWithTime, listenerHandler } from '@rrweb/types';
import { record } from '@rrweb/record';
import { pack } from '@rrweb/packer';
import { whenReady } from './whenReady';
import { onHidden } from './onHidden';
import { whenVisible } from './whenVisible';
import { encode } from 'js-base64';
import { uuid } from '../utils';

export class Rrweb {
    private record: listenerHandler | undefined;

    private recordData: any[] = [];

    private readonly MAX_EVENTS_PER_CHUNK: number = 10;

    private recordScreenId = '';

    init() {
        this.recordScreenId = uuid();

        // 当页面加载完成时候开启录制
        whenReady(() => {
            console.log('开启录制');
            this.startRecord();
        });

        // 当页面关闭时候停止录制
        onHidden(() => {
            console.log('关闭录制');
            this.stopRecord();
        }, false);

        // 当页面可见时候重启录制
        whenVisible(() => {
            console.log('重启录制');
            this.startRecord();
        });
    }

    /**
     * 开启屏幕录制
     */
    startRecord() {
        this.record = record({
            emit: async <T = eventWithTime>(event: T, isCheckout: boolean | undefined) => {
                if (isCheckout) {
                    this.recordData = [];
                    this.recordScreenId = uuid();
                }

                this.recordData.push(encode(JSON.stringify(event)));
                console.log(this.recordData);
            },
            packFn: pack,
            // // 每 200 个 event 重新制作快照
            // checkoutEveryNth: 10,
            // // 每5分钟重新制作快照
            // checkoutEveryNms: 5 * 60 * 1000,
        });
    }

    /**
     * 停止屏幕录制
     */
    stopRecord() {
        this.record?.();
    }
}
