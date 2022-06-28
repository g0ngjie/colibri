import { maybeMatching, notice } from "./common";
import { IGlobalState, IRef } from "./types";

// 共享状态
let globalState: IRef<IGlobalState>
// fetch 副本
export const OriginFetch = window.fetch.bind(window)
// 初始化共享状态
export const initFetchState = (state: IRef<IGlobalState>) => globalState = state

function CustomFetch(...args): Promise<Response> {
    let [resource, config] = args;
    if (config) {
        const reqInit: RequestInit = config
        const method = reqInit?.method?.toUpperCase()
        console.log("[debug]method:", method)
    }
    console.log("[debug]config:", config)
    return OriginFetch(resource, config).then((response: Response) => {
        let txt;
        globalState.value.matching_content.forEach(target => {
            const { switch_on = true, match_url, override = "", filter_type } = target
            // 是否需要匹配
            if (switch_on && match_url) {
                // 规则匹配
                const matched = maybeMatching(response.url, match_url, filter_type);
                if (matched) {
                    notice(response.url, match_url)
                    txt = typeof override === "string" ? override : JSON.stringify(override);
                }
            }
        });

        if (txt && globalState.value.switch_on) {
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
        } else return response;
    });
}

export default CustomFetch