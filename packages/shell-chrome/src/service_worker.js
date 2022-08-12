
console.log("Colibri service_worker.js")
import {
    Notice,
    NoticeKey,
} from "@colibri/shared-utils/lib/consts";

// 接收content 传来的信息
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === Notice.TYPE && msg.to === Notice.TO_BACKGROUND) {
        // 判断启用状态
        if (msg.key === NoticeKey.GLOBAL_SWITCH) {
            chrome.action.setIcon({
                path: msg.value ? "icons/128.png" : "icons/128g.png",
            });
        }
    }
});