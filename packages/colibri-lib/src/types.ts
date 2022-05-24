export type IFilterType = "normal" | "regex";
export interface IMatchContent {
    switch_on: boolean;
    match_url: string;
    override?: string;
    filter_type?: IFilterType;
}

export interface IGlobalState {
    switch_on: boolean;
    matching_content: IMatchContent[];
}

export interface IRef<T> {
    readonly _is_ref: boolean
    _value: T
    value: T
}