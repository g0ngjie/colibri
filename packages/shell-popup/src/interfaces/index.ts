import type { IRequestMethod, IMatchContent } from "@colibri/lib.v2";

export interface ITableRowData extends IMatchContent {
    id: string;
    // url: string;
    // label?: string;
    // filter_type: 'regex' | 'normal';
    method: IRequestMethod;
    // hit: number;
}