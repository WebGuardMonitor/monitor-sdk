import {bytesToUuid} from "./bytesToUuid";
import { rngBrowser as rng} from './rng-browser';

export const uuid = (options: any = null as any, buf: any = null as any, offset: number = 0):string => {
    const i = buf && offset || 0;

    if (typeof(options) == 'string') {
        buf = options === 'binary' ? new Array(16) : null;
        options = null;
    }
    options = options || {};

    const rnds = options.random || (options.rng || rng)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
        for (let ii = 0; ii < 16; ++ii) {
            buf[i + ii] = rnds[ii];
        }
    }

    return buf || bytesToUuid(rnds);
}