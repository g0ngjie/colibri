import { maybeMatching, notice } from "./common";
import { IGlobalState, IRef } from "./types";

// 共享状态
let globalState: IRef<IGlobalState>
// XMLHttpRequest 副本
export const OriginXHR = window.XMLHttpRequest;
// 初始化共享状态
export const initXHRState = (state: IRef<IGlobalState>) => globalState = state

class CustomXHR extends XMLHttpRequest {
    // 响应内容
    responseText;
    // XHR 响应
    response: any;
    // 消息锁
    private message_once_lock: boolean = false;

    constructor() {
        super();
        this.watchEffect()
    }

    // 规则匹配，修改响应内容
    private maybeNeedModifyRes() {
        globalState.value.matching_content.forEach(target => {
            const { switch_on = true, match_url, override = "", filter_type } = target
            let matched: boolean = false;
            // 是否需要匹配
            if (switch_on && match_url) {
                // 规则匹配
                matched = maybeMatching(this.responseURL, match_url, filter_type);
            }
            if (matched) {
                this.responseText = override;
                this.response = override;
                // 通知
                if (!this.message_once_lock) {
                    notice(this.responseURL, match_url);
                    this.message_once_lock = true;
                }
            }
        });
    }

    private watchEffect() {
        const xhr = new OriginXHR();
        for (let attr in xhr) {
            if (attr === "onreadystatechange") {
                xhr.onreadystatechange = (...args) => {
                    if (this.readyState == 4) {
                        // 开启拦截
                        this.maybeNeedModifyRes();
                    }
                    this.onreadystatechange && this.onreadystatechange.apply(this, args);
                };
                continue;
            } else if (attr === "onload") {
                xhr.onload = (...args) => {
                    // 开启拦截
                    this.maybeNeedModifyRes();
                    this.onload && this.onload.apply(this, args);
                };
                continue;
            }

            if (typeof xhr[attr] === "function") {
                this[attr] = xhr[attr].bind(xhr);
            } else {
                // responseText和response不是writeable的，但拦截时需要修改它，所以修改就存储在this[`_${attr}`]上
                if (['responseText', 'response'].includes(attr)) {
                    Object.defineProperty(this, attr, {
                        get: () =>
                            this[`_${attr}`] == undefined ? xhr[attr] : this[`_${attr}`],
                        set: (val) => (this[`_${attr}`] = val),
                        enumerable: true,
                    });
                } else {
                    Object.defineProperty(this, attr, {
                        get: () => xhr[attr],
                        set: (val) => (xhr[attr] = val),
                        enumerable: true,
                    });
                }
            }
        }
    }
}

export default CustomXHR