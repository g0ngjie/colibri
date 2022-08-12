console.log("Colibri content.js")

import {
    getStorage,
    initStorage,
    Notice,
    NoticeKey,
    StorageKey,
    noticeDocumentByContent,
    noticeBackgroundByContent,
} from "@colibri/shared-utils";

// 在页面上插入代码
const script = document.createElement("script");
script.setAttribute("type", "module");
script.setAttribute("src", chrome.runtime.getURL("document.js"));
document.documentElement.appendChild(script);

initStorage().then(() => {

    const storage = getStorage("sync", "default value is null");
    console.log("[debug]storage:", storage)
    script.addEventListener("load", () => {
        if (getStorage(StorageKey.GLOBAL_SWITCH, false)) {
            noticeDocumentByContent(NoticeKey.GLOBAL_SWITCH, true);
            noticeBackgroundByContent(NoticeKey.GLOBAL_SWITCH, true);
        }
        if (getStorage(StorageKey.INTERCEPT_LIST)) {
            noticeDocumentByContent(NoticeKey.INTERCEPT_LIST, getStorage(StorageKey.INTERCEPT_LIST));
        }
    });

    // 接收 popup 的消息 转发给 document
    chrome.runtime.onMessage.addListener((msg) => {
        console.log("[debug]接收 popup 的消息 转发给 document msg:", msg)
        if (msg.type === Notice.TYPE && msg.to === Notice.TO_CONTENT) {
            // 判断徽章
            if (msg.key === NoticeKey.GLOBAL_SWITCH) {
                noticeDocumentByContent(NoticeKey.GLOBAL_SWITCH, msg.value);
            }
            // 同步拦截列表
            if (msg.key === NoticeKey.INTERCEPT_LIST) {
                noticeDocumentByContent(NoticeKey.INTERCEPT_LIST, msg.value);
            }
        }
    })

})


