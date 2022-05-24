import { IFilterType } from "./types";

// match_url规则匹配
export function maybeMatching(url, match, type: IFilterType = "normal") {
    let matched = false;
    switch (type) {
        // 普通匹配规则
        case "normal":
            matched = url.includes(match);
            break;
        // 正则匹配规则
        case "regex":
            matched = url.match(new RegExp(match, "i"));
            break;
    }
    return matched;
}

// 通知到 content 命中统计
export function notice(url: string, match_url: string) {
    window.dispatchEvent(
        new CustomEvent("core_notice", {
            detail: { url, match_url },
        })
    );
}

export const warn = (...args) => console.warn(...args)