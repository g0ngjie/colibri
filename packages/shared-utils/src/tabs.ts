import { target } from "./env";

const useTabs = typeof target.chrome !== "undefined" && typeof target.chrome.tabs !== "undefined";

interface IChromeTab {
    active: boolean;
    audible: boolean;
    autoDiscardable: boolean;
    discarded: boolean;
    favIconUrl: string;
    groupId: number;
    height: number;
    highlighted: boolean;
    id: number;
    incognito: boolean;
    index: number;
    mutedInfo: {
        muted: boolean;
    };
    pinned: boolean;
    selected: boolean;
    status: string;
    title: string | undefined, // 同 url
    url: string | undefined, // 非正常: edge://extensions/ 返回 undefined
    width: number;
    windowId: number;
}

/**获取当前标签页 */
export function useCurrentTab(): Promise<IChromeTab | void> {
    if (useTabs) {
        return new Promise(resolve => {
            target.chrome.tabs.query({ active: true, currentWindow: true }, function (tabs: IChromeTab[]) {
                const tab = tabs[0];
                resolve(tab)
            })
        })
    }
    return Promise.resolve()
}
