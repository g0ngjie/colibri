import { maybeMatching, notice } from "./common";
import { IGlobalState } from "./types";
import { IRefImpl } from "@colibri/reactivity";

// 共享状态
let globalState: IRefImpl<IGlobalState>
// fetch 副本
export const OriginFetch = window.fetch.bind(window)
// 初始化共享状态
export const initFetchState = (state: IRefImpl<IGlobalState>) => globalState = state

function CustomFetch(...args): Promise<Response> {
    let [resource, config] = args;
    let fetchMethod: string | undefined
    if (config) {
        const reqInit: RequestInit = config
        fetchMethod = reqInit?.method?.toUpperCase()
    }
    return OriginFetch(resource, config).then((response: Response) => {
        let txt;
        globalState.value.matching_content.forEach(target => {
            const { switch_on = true, match_url, override = "", filter_type, method } = target
            // 是否需要匹配
            if (switch_on && match_url) {
                // 判断是否存在协议匹配
                if (method && method.toUpperCase() !== fetchMethod) return
                // 规则匹配
                const matched = maybeMatching(response.url, match_url, filter_type);
                if (!matched) return // 退出当前循环
                // 修改响应
                txt = typeof override === "string" ? override : JSON.stringify(override);
                // 通知
                notice(response.url, match_url)
            }
        });

        // 返回原始响应
        if (!globalState.value.switch_on || !txt) return response

        const stream = new ReadableStream({
            start(controller) {
                controller.enqueue(new TextEncoder().encode(txt));
                controller.close();
            },
        });
        const newResponse = new Response(stream, {
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
        });
        const proxy = new Proxy(newResponse, {
            get: function (target, prop) {
                const checkKeys = ['ok', 'redirected', 'type', 'url', 'useFinalURL', 'body', 'bodyUsed'];
                if (checkKeys.includes(prop as string)) {
                    return response[prop];
                }
                return target[prop];
            },
        });

        for (let key in proxy) {
            if (typeof proxy[key] === "function") {
                proxy[key] = proxy[key].bind(newResponse);
            }
        }
        return proxy;
    });
}

export default CustomFetch