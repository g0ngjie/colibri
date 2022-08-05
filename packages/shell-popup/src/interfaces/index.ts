import type { IRequestMethod } from "@colibri/lib.v2";

export interface ITableRowData {
    id: string;
    url: string;
    label?: string;
    method: IRequestMethod;
}