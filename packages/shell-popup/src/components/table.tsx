import { defineComponent } from "vue";
import { useData } from "../store/data";
import { NButton, NDataTable, NSpace, NSwitch } from "naive-ui";
import type { DataTableColumns } from "naive-ui"
import { IMatchContent } from "@colibri/lib.v2/types/types";

interface ITableOptions {
    delFn: (url: string) => void;
    editFn: (url: string) => void;
    switchFn: (url: string, bool: boolean) => void;
}

export default defineComponent(() => {

    const store = useData()

    const createColumns = ({ delFn, editFn, switchFn }: ITableOptions): DataTableColumns<IMatchContent> => [
        {
            title: "status",
            minWidth: "70",
            key: "",
            render: (row: any, index: number) => (
                <NSwitch
                    size="small"
                    v-model:value={row.switchOn}
                    round={false}
                    onUpdate:value={(bool) => switchFn(row.switch_on, bool)}
                />
            ),
        },
        {
            title: "title",
            minWidth: "100",
            key: "title",
            ellipsis: {
                tooltip: true,
            },
        },
        {
            title: "match",
            minWidth: "100",
            key: "match_url",
            ellipsis: {
                tooltip: true,
            },
        },
        {
            title: "remarks",
            minWidth: "150",
            key: "remarks",
            ellipsis: {
                tooltip: true,
            },
        },
        {
            title: "hit",
            minWidth: "150",
            key: "hit",
        },
        {
            title: "options",
            width: "160",
            key: "",
            fixed: "right",
            render(row: any, index: number) {
                return (
                    <>
                        <NSpace>
                            <NButton
                                ghost
                                size="tiny"
                                type="info"
                                onClick={() => editFn(row.id)}
                            >
                                edit
                            </NButton>
                            <NButton
                                ghost
                                type="error"
                                size="tiny"
                                onClick={() => delFn(row.id)}
                            >
                                delete
                            </NButton>
                        </NSpace>
                    </>
                );
            },
        },
    ];

    return () => <>
        <NDataTable
            size="small"
            bordered={false}
            striped
            loading={!store.tableLoaded}
            single-line={false}
            scroll-x={500}
            columns={createColumns({
                switchFn: (url) => { },
                delFn: (url) => { },
                editFn: (url) => { },
            })}
            data={store.tableList}
        />
    </>
})