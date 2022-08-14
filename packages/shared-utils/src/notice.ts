import { target } from "./env";
import { Notice, NoticeKey } from "./consts";
import { IChromeTab } from "./tabs";

const useTabs = typeof target.chrome !== "undefined" && typeof target.chrome.tabs !== "undefined";
const useRuntime = typeof target.chrome !== "undefined" && typeof target.chrome.runtime !== "undefined";

/**
 * 通知 popup -> content
 * @param key 
 * @param value 
 */
export function noticeContentByPopup(key: NoticeKey, value) {
    if (useTabs) {
        target.chrome.tabs.query({ active: true, currentWindow: true }, (tabs: IChromeTab[]) => {
            const tab = tabs[0];
            // 这里校验一下是否当前为一个正常的页面
            // 非正常: edge://extensions/ url: undefined
            if (tab.url) {
                target.chrome.tabs.sendMessage(tab.id, {
                    type: Notice.TYPE,
                    to: Notice.TO_CONTENT,
                    key,
                    value,
                });
            }
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
 * 通知 content -> background
 * @param key
 * @param value
 */
export function noticeBackgroundByContent(key: NoticeKey, value) {
    if (useRuntime) {
        target.chrome.runtime.sendMessage({
            type: Notice.TYPE,
            to: Notice.TO_BACKGROUND,
            key,
            value,
        });
    }
}