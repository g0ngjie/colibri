import env from "@vue-devtools/shared-utils";

env.target.chrome.webRequest.onBeforeRequest.addListener(
    handlerRequest,
    {
        urls: ['<all_urls>'],
    },
    // 定义获取哪些权限
    ['blocking', 'requestBody', 'extraHeaders']
)

// 其类型是 chrome.webRequest.WebRequestDetails
function handlerRequest(
    details
) {
    console.log("[debug]details:", details)
    // 注意 proxy 和 block 需要你自己定义
    /**
     * 代理转发
     */
    // if (proxy) {
    //     return {
    //         redirectUrl: details.url.replace(
    //             proxy.origin,
    //             proxy.target
    //         ),
    //     }
    // }

    // /**
    //  * 请求拦截
    //  * */
    // if (block) {
    //     return { cancel: true }
    // }
}