console.log("Colibri content.js")

import { getStorage, initStorage } from "@colibri/shared-utils";

// 在页面上插入代码
const script = document.createElement("script");
script.setAttribute("type", "module");
script.setAttribute("src", chrome.runtime.getURL("document.js"));
document.documentElement.appendChild(script);

initStorage().then(() => {

    const storage = getStorage("sync", "default value is null");
    console.log("[debug]storage:", storage)
    script.addEventListener("load", () => {
        postMessage({
            type: "colibri_message",
            to: "document",
            key: "globalSwitchOn",
            value: true,
        });
        postMessage({
            type: "colibri_message",
            to: "document",
            key: "proxy_routes",
            value: true,
        });
        // ["globalSwitchOn", "proxy_routes", "mode", "redirect"]
        if (getStorage("globalSwitchOn", false)) {
            postMessage({
                type: "colibri_message",
                to: "document",
                key: "globalSwitchOn",
                value: true,
            });
        }
        if (getStorage("proxy_routes")) {
            postMessage({
                type: "colibri_message",
                to: "document",
                key: "proxy_routes",
                value: getStorage("proxy_routes"),
            });
        }
    });

    // // 接收background.js传来的信息，转发给core
    // chrome.runtime.onMessage.addListener((msg) => {
    //     if (msg.type === "colibri_message" && msg.to === "content") {
    //         const _isInclude = [
    //             "globalSwitchOn",
    //             "proxy_routes",
    //             "mode",
    //             "redirect",
    //         ].includes(msg.key);
    //         if (_isInclude)
    //             postMessage({
    //                 type: "colibri_message",
    //                 to: "document",
    //                 key: msg.key,
    //                 value: msg.value,
    //             });
    //     }
    // });

    // // 接收core传来的信息,转发给background
    // window.addEventListener(
    //     "core_notice",
    //     function (event) {
    //         if (chrome.runtime) {
    //             // 转发给background
    //             chrome.runtime.sendMessage({
    //                 type: "colibri_message",
    //                 to: "background",
    //                 key: "badge",
    //                 ...event.detail,
    //             });
    //         }
    //     },
    //     false
    // );

})


