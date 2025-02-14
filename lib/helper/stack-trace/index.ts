import {createStackParser, stackParserFromStackParserOptions, UNKNOWN_FUNCTION} from "@/core/stacktrace/stacktrace";
import {StackLineParser, StackLineParserFn} from "@/types/stacktrace.types";
import {StackFrame} from "@/types/stackframe.types";

/**
 * 以下来自于 sentry browser stack-parsers.ts
 * @link https://github.com/getsentry/sentry-javascript/blob/develop/packages/browser/src/stack-parsers.ts
 */

const OPERA10_PRIORITY = 10;
const OPERA11_PRIORITY = 20;
const CHROME_PRIORITY = 30;
const WINJS_PRIORITY = 40;
const GECKO_PRIORITY = 50;

export const createFrame = (filename: string, func: string, lineno?: number, colno?: number): StackFrame => {
    const frame: StackFrame = {
        filename,
        function: func === '<anonymous>' ? UNKNOWN_FUNCTION : func,
        in_app: true, // All browser frames are considered in_app
    };

    if (lineno !== undefined) {
        frame.lineno = lineno;
    }

    if (colno !== undefined) {
        frame.colno = colno;
    }

    return frame;
}

// This regex matches frames that have no function name (ie. are at the top level of a module).
// For example "at http://localhost:5000//script.js:1:126"
// Frames _with_ function names usually look as follows: "at commitLayoutEffects (react-dom.development.js:23426:1)"
const chromeRegexNoFnName = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i;

// This regex matches all the frames that have a function name.
const chromeRegex =
    /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;

const chromeEvalRegex = /\((\S*)(?::(\d+))(?::(\d+))\)/;

// Chromium based browsers: Chrome, Brave, new Opera, new Edge
// We cannot call this variable `chrome` because it can conflict with global `chrome` variable in certain environments
// See: https://github.com/getsentry/sentry-javascript/issues/6880
const chromeStackParserFn: StackLineParserFn = line => {
    // If the stack line has no function name, we need to parse it differently
    const noFnParts = chromeRegexNoFnName.exec(line) as null | [string, string, string, string];

    if (noFnParts) {
        const [, filename, line, col] = noFnParts;
        return createFrame(filename, UNKNOWN_FUNCTION, +line, +col);
    }

    const parts = chromeRegex.exec(line) as null | [string, string, string, string, string];

    if (parts) {
        const isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line

        if (isEval) {
            const subMatch = chromeEvalRegex.exec(parts[2]) as null | [string, string, string, string];

            if (subMatch) {
                // throw out eval line/column and use top-most line/column number
                parts[2] = subMatch[1]; // url
                parts[3] = subMatch[2]; // line
                parts[4] = subMatch[3]; // column
            }
        }

        // Kamil: One more hack won't hurt us right? Understanding and adding more rules on top of these regexps right now
        // would be way too time consuming. (TODO: Rewrite whole RegExp to be more readable)
        const [func, filename] = extractSafariExtensionDetails(parts[1] || UNKNOWN_FUNCTION, parts[2]);

        return createFrame(filename, func, parts[3] ? +parts[3] : undefined, parts[4] ? +parts[4] : undefined);
    }

    return;
};

export const chromeStackLineParser: StackLineParser = [CHROME_PRIORITY, chromeStackParserFn];

// gecko regex: `(?:bundle|\d+\.js)`: `bundle` is for react native, `\d+\.js` also but specifically for ram bundles because it
// generates filenames without a prefix like `file://` the filenames in the stacktrace are just 42.js
// We need this specific case for now because we want no other regex to match.
const geckoREgex =
    /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
const geckoEvalRegex = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;

const gecko: StackLineParserFn = line => {
    const parts = geckoREgex.exec(line) as null | [string, string, string, string, string, string];

    if (parts) {
        const isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
        if (isEval) {
            const subMatch = geckoEvalRegex.exec(parts[3]) as null | [string, string, string];

            if (subMatch) {
                // throw out eval line/column and use top-most line number
                parts[1] = parts[1] || 'eval';
                parts[3] = subMatch[1];
                parts[4] = subMatch[2];
                parts[5] = ''; // no column when eval
            }
        }

        let filename = parts[3];
        let func = parts[1] || UNKNOWN_FUNCTION;
        [func, filename] = extractSafariExtensionDetails(func, filename);

        return createFrame(filename, func, parts[4] ? +parts[4] : undefined, parts[5] ? +parts[5] : undefined);
    }

    return;
};

export const geckoStackLineParser: StackLineParser = [GECKO_PRIORITY, gecko];

export const defaultStackLineParsers = [chromeStackLineParser, geckoStackLineParser];

export const defaultStackParser = createStackParser(...defaultStackLineParsers);
/**
 * Safari web extensions, starting version unknown, can produce "frames-only" stacktraces.
 * What it means, is that instead of format like:
 *
 * Error: wat
 *   at function@url:row:col
 *   at function@url:row:col
 *   at function@url:row:col
 *
 * it produces something like:
 *
 *   function@url:row:col
 *   function@url:row:col
 *   function@url:row:col
 *
 * Because of that, it won't be captured by `chrome` RegExp and will fall into `Gecko` branch.
 * This function is extracted so that we can use it in both places without duplicating the logic.
 * Unfortunately "just" changing RegExp is too complicated now and making it pass all tests
 * and fix this case seems like an impossible, or at least way too time-consuming task.
 */
export const extractSafariExtensionDetails = (func: string, filename: string): [string, string] => {
    const isSafariExtension = func.indexOf('safari-extension') !== -1;
    const isSafariWebExtension = func.indexOf('safari-web-extension') !== -1;

    return isSafariExtension || isSafariWebExtension
        ? [
            func.indexOf('@') !== -1 ? (func.split('@')[0] as string) : UNKNOWN_FUNCTION,
            isSafariExtension ? `safari-extension:${filename}` : `safari-web-extension:${filename}`,
        ]
        : [func, filename];
};

/**
 * browser 异常错误堆栈解析
 */
export const errorStackParser = stackParserFromStackParserOptions(defaultStackParser)