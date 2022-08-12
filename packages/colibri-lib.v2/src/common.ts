import { IFilterType } from "./types";

// match_url规则匹配
export function maybeMatching(url: string, match: string, type: IFilterType = "normal") {
    let matched = false;
    switch (type) {
        // 普通匹配规则
        case "normal":
            matched = url.includes(match);
            break;
        // 正则匹配规则
        case "regex":
            try {
                url.match(new RegExp(match, "i")) && (matched = true);
            } catch (error) { }
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

export const warn = (...args: any[]) => console.warn(...args)