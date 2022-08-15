import type { IMatchContent } from "@colibri/lib.v2";

export interface ITableRowData extends IMatchContent {
    id: string;
    // 展示状态
    expand: boolean;
}