export interface IChromeTab {
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
    title: string | undefined;
    url: string | undefined;
    width: number;
    windowId: number;
}
/**获取当前标签页 */
export declare function useCurrentTab(): Promise<IChromeTab | void>;
