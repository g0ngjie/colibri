/**获取当前标签页 */
export declare function useCurrentTab(): Promise<{
    tab: any;
    url: string | undefined;
    title: string | undefined;
    highlighted: boolean;
} | void>;
