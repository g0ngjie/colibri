import { target } from "./env";

const useTabs = typeof target.chrome !== "undefined" && typeof target.chrome.tabs !== "undefined";

/**获取当前标签页 */
export function useCurrentTab(): Promise<{
    tab: any,
    url: string | undefined,
    title: string | undefined,
    highlighted: boolean,
} | void> {
    if (useTabs) {
        return new Promise(resolve => {
            target.chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                const url = tabs[0].url;
                const title = tabs[0].title;
                const highlighted = tabs[0].highlighted;
                resolve({
                    tab: tabs[0],
                    url,
                    title,
                    highlighted
                })
            })
        })
    }
    return Promise.resolve()
}