import { target } from "./env";
import { Notice, NoticeKey } from "./consts";

const useTabs = typeof target.chrome !== "undefined" && typeof target.chrome.tabs !== "undefined";
const useRuntime = typeof target.chrome !== "undefined" && typeof target.chrome.runtime !== "undefined";

/**
 * 通知 popup -> content
 * @param key 
 * @param value 
 */
export function noticeContentByPopup(key: NoticeKey, value) {
    if (useTabs) {
        target.chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            target.chrome.tabs.sendMessage(tabs[0].id, {
                type: Notice.TYPE,
                to: Notice.TO_CONTENT,
                key,
                value,
            });
        });
    }
}

/**
 * 通知 content -> document
 */
export function noticeDocumentByContent(key: NoticeKey, value) {
    window.postMessage({
        type: Notice.TYPE,
        to: Notice.TO_DOCUMENT,
        key,
        value,
    });
}

/**
 * 通知 popup
 */
export function noticePopup(key: NoticeKey, value) {
    if (useRuntime) {
        target.chrome.runtime.sendMessage({
            type: Notice.TYPE,
            to: Notice.TO_POPUP,
            key,
            value,
        });
    }
}

/**
 * 通知 background
 * @param key
 * @param value
 */
export function noticeBackground(key: NoticeKey, value) {
    if (useRuntime) {
        target.chrome.runtime.sendMessage({
            type: Notice.TYPE,
            to: Notice.TO_BACKGROUND,
            key,
            value,
        });
    }
}