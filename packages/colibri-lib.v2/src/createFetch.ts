import { maybeMatching, notice } from "./common";
import { IGlobalState } from "./types";
import { Ref } from "@vue/reactivity";

// 共享状态
let globalState: Ref<IGlobalState>
// fetch 副本
export const OriginFetch = window.fetch.bind(window)
// 初始化共享状态
export const initFetchState = (state: Ref<IGlobalState>) => globalState = state

function CustomFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    let fetchMethod: string | undefined
    if (init) {
        fetchMethod = init.method?.toUpperCase()
    }
    // @ts-ignore
    return OriginFetch(input, init).then((response: Response) => {
        let txt: string | undefined;
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
                    return Reflect.get(target, prop);
                }
                return Reflect.get(target, prop);
            },
        });

        for (let key in proxy) {
            // 获取proxy key 对应实例
            const target = Reflect.get(proxy, key);
            // 判断实例是否为 Response 实例
            if (typeof target === "function") {
                // 将新的 Response 实例绑定到 proxy 实例上
                Reflect.set(proxy, key, target.bind(newResponse));
            }
        }
        return proxy;
    });
}

export default CustomFetch