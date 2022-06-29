import { maybeMatching, notice } from "./common";
import { IGlobalState } from "./types";
import { IRefImpl } from "@colibri/reactivity";

// 共享状态
let globalState: IRefImpl<IGlobalState>
// XMLHttpRequest 副本
export const OriginXHR = window.XMLHttpRequest;
// 初始化共享状态
export const initXHRState = (state: IRefImpl<IGlobalState>) => globalState = state

class CustomXHR extends XMLHttpRequest {
    // 响应内容
    responseText;
    // XHR 响应
    response: any;
    // 请求协议
    method = 'GET'
    // 消息锁
    private message_once_lock: boolean = false;

    constructor() {
        super();
        // 初始化原始XHR实例
        // 将XHR属性赋值给Custom
        // 重写 response & responseText
        this.watchAndOverride()
        // 拦截open，获取请求协议
        this.getMethod()
    }

    // 获取请求协议
    private getMethod() {
        const { open } = this
        this.open = (
            method: string,
            url: string | URL,
            async?: boolean,
            username?: string | null,
            password?: string | null,
        ) => {
            // 获取当前请求协议
            this.method = (method || 'GET').toUpperCase()
            open.apply(this, [method, url, async !== undefined ? async : true, username, password])
        }
    }

    // 规则匹配，修改响应内容
    private maybeNeedModifyRes() {
        globalState.value.matching_content.forEach(target => {
            const { switch_on = true, match_url, override = "", filter_type, method } = target
            // 是否需要匹配
            if (switch_on && match_url) {
                // 判断是否存在协议匹配
                if (method && method.toUpperCase() !== this.method) return
                // 规则匹配
                const matched = maybeMatching(this.responseURL, match_url, filter_type);
                if (!matched) return // 退出当前循环
                // 修改响应
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

    // 属性重写
    private overrideAttr(attr: string, xhr: XMLHttpRequest) {
        if (typeof xhr[attr] === "function") this[attr] = xhr[attr].bind(xhr);
        else if (['responseText', 'response'].includes(attr))
            // responseText和response 属性只读
            // 缓存在对应 自定义 _[attr] 上
            // https://juejin.cn/post/6844903470181384206
            Object.defineProperty(this, attr, {
                get: () =>
                    this[`_${attr}`] == undefined ? xhr[attr] : this[`_${attr}`],
                set: (val) => (this[`_${attr}`] = val),
                enumerable: true,
            });
        else
            Object.defineProperty(this, attr, {
                get: () => xhr[attr],
                set: (val) => (xhr[attr] = val),
                enumerable: true,
            });
    }

    // 拦截监听
    private watchAndOverride() {
        // 获取原始XHR
        const xhr = new OriginXHR();
        for (let attr in xhr) {
            if (attr === "onreadystatechange") {
                xhr.onreadystatechange = (...args) => {
                    // 开启拦截
                    if (this.readyState == 4) this.maybeNeedModifyRes();
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
            // 其他属性重写
            this.overrideAttr(attr, xhr)
        }
    }
}

export default CustomXHR