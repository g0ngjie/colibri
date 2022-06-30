import { defineComponent } from "vue";
import { useData } from "../../store/data";
import { NButton, NDataTable, NSpace, NSwitch } from "naive-ui";
import type { DataTableColumns } from "naive-ui"
import { IMatchContent } from "@colibri/lib/lib/types";

interface ITableOptions {
    delFn: (url: string) => void;
    editFn: (url: string) => void;
    switchFn: (url: string, bool: boolean) => void;
}

export default defineComponent(() => {

    const store = useData()

    const createColumns = ({ delFn, editFn, switchFn }: ITableOptions): DataTableColumns<IMatchContent> => [
        {
            title: "switch",
            minWidth: "70",
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
            title: "globalKey",
            minWidth: "100",
            key: "globalKey",
            ellipsis: {
                tooltip: true,
            },
        },
        {
            title: "description",
            minWidth: "150",
            key: "description",
            ellipsis: {
                tooltip: true,
            },
        },
        // {
        //     title: "options",
        //     width: "160",
        //     fixed: "right",
        //     render(row: any, index: number) {
        //         return (
        //             <>
        //                 <NSpace>
        //                     <NButton
        //                         ghost
        //                         size="tiny"
        //                         type="info"
        //                         onClick={() => editFn(row.id)}
        //                     >
        //                         edit
        //                     </NButton>
        //                     <NButton
        //                         ghost
        //                         type="error"
        //                         size="tiny"
        //                         onClick={() => delFn(row.id)}
        //                     >
        //                         delete
        //                     </NButton>
        //                 </NSpace>
        //             </>
        //         );
        //     },
        // },
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