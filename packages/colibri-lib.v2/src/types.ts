export type IFilterType = "normal" | "regex";

export interface IMatchContent {
    /**是否需要匹配 */
    switch_on: boolean;
    /**匹配目标URL */
    match_url: string;
    /**需要覆盖的内容 */
    override?: string;
    /**匹配规则 */
    filter_type?: IFilterType;
    /**请求协议 */
    method?: string;
    /**备注 */
    remarks?: string;
    /**命中率 */
    hit?: number;
    /**标题 */
    title?: string;
}

export interface IGlobalState {
    /**全局开关 */
    switch_on: boolean;
    /**规则列表 */
    matching_content: IMatchContent[];
}

/**匹配规则数据映射 */
export interface IMatchContentMap {
    [match_url: string]: IMatchContent
}