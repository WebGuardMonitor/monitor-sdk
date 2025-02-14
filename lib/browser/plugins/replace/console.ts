import {BaseMonitorPlugin} from "@/core/baseMonitorPlugin";
import {ClientTypes} from "@/types/clientTypes";
import {ConsoleLevel} from "@/types/instrument";
import {WINDOW} from "@/utils";
import {
    consoleDefaultStrategy,
    consoleImmediatelyStrategy,
    createConsoleStrategy
} from "@/browser/plugins/replace/pattern/console.strategy";

export const CONSOLE_LEVELS: readonly ConsoleLevel[] = [
    'debug',
    'info',
    'warn',
    'error',
    // 'log',
    'assert',
    'trace',
] as const;


/**
 * Console 重写监听
 *
 * @link https://developer.mozilla.org/zh-CN/docs/Web/API/console
 * @link https://github.com/getsentry/sentry-javascript/blob/develop/packages/core/src/utils-hoist/instrument/console.ts
 */
export class ConsoleMonitorPlugin extends BaseMonitorPlugin {
    initialize(client: ClientTypes) {

        const consoleListener = new createConsoleStrategy();

        consoleListener.setStrategy(Reflect.construct(consoleImmediatelyStrategy, []));
        consoleListener.setStrategy(Reflect.construct(consoleDefaultStrategy, []));

        CONSOLE_LEVELS.forEach(level => {

            const oldConsoleMethod = WINDOW.console[level]

            WINDOW.console[level] = (...args) => {

                consoleListener.listener(client, level, args)

                oldConsoleMethod.apply(WINDOW.console, args)
            }
        })
    }
}