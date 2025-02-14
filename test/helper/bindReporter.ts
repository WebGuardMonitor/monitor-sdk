import { createReporter } from './createReporter';
import { createBrowserSender } from '../utils';
import { getReportUrl } from './BasicUrl';
import { buildBasicData } from './BasicData';

/**
 * 建立 Report 数据
 * @param data
 */
export const bindReporter = (data: Object) => {
    createReporter(() => {
        createBrowserSender.sendHttp().post({
            url: getReportUrl(),
            data: {
                ...data,
                basic: { ...buildBasicData() },
            },
        });
    });
};
