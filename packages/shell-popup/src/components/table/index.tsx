import { defineComponent, ref } from "vue";
import { useData } from "@/store/data";
import { NButton, NDataTable, NSpace, NSwitch, NInput } from "naive-ui";
import type { DataTableColumns } from "naive-ui"
import { IMatchContent, IRequestMethod } from "@colibri/lib.v2/types/types";
import { CollapseBtn, MethodTag, SetUpRow } from "./tools";
import { ITableRowData } from "@/interfaces";
import styl from "./index.module.scss";

const list: ITableRowData[] = [
    { id: '1', url: '1', method: 'GET' },
    { id: '2', url: '2', method: 'ANY' },
    { id: '3', url: '3', method: "PATCH" },
    { id: '4', url: '4', method: "DELETE" },
    { id: '4', url: '4', method: "PUT" },
    { id: '4', url: '4', method: "POST" },
]

export default defineComponent(() => {

    const interceptors = ref<ITableRowData[]>(list)
    const store = useData()
    return () => <div class={styl.tableContainer}>
        {
            interceptors.value.map((item) => {
                return <div class={styl.rowContainer}>
                    <RowContainer data={item} />
                </div>
            })
        }
    </div>
})



interface IRowContainerProps {
    data: ITableRowData
}

const RowContainer = defineComponent({
    props: {
        data: {
            type: Object as () => ITableRowData,
            required: true,
        }
    },
    setup(props) {
        const show = ref(false)
        return () =>
            <>
                <div class={styl.row}>
                    <CollapseBtn show={show.value} update={(bool: boolean) => show.value = bool} />
                    <div class={styl.rowInput}>
                        <NInput size="small" placeholder="url"></NInput>
                    </div>
                    <div class={styl.rowMethodTag}>
                        <MethodTag method={props.data.method} />
                    </div>
                </div>
                <div class={styl.rowInfoContainer}>
                    {show.value && <SetUpRow data={props.data} />}
                </div>
            </>
    }
})