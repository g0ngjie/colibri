import { target } from "./env";
import { Notice } from "./consts";

const useTabs = typeof target.chrome !== "undefined" && typeof target.chrome.tabs !== "undefined";
const useRuntime = typeof target.chrome !== "undefined" && typeof target.chrome.runtime !== "undefined";

/**
 * 通知content
 * @param key 
 * @param value 
 */
export function noticeContent(key, value) {
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
 * 通知 document
 */
export function noticeDocument(key, value) {
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
export function noticePopup(key, value) {
    if (useRuntime) {
        target.chrome.runtime.sendMessage({
            type: Notice.TYPE,
            to: Notice.TO_POPUP,
            key,
            value,
        });
    }
}