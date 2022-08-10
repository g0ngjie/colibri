import { defineComponent, ref } from "vue";
import { useData } from "@/store/data";
import { NButton, NDataTable, NSpace, NSwitch, NInput, NSelect, NIcon } from "naive-ui";
import type { DataTableColumns } from "naive-ui"
import { IMatchContent, IRequestMethod } from "@colibri/lib.v2/types/types";
import { CollapseBtn, MethodTag, SetUpRow } from "./tools";
import { ITableRowData } from "@/interfaces";
import styl from "./index.module.scss";

const list: ITableRowData[] = [
    { id: '1', url: '1', method: 'GET', filter_type: 'regex' },
    { id: '2', url: '2', method: 'ANY', filter_type: 'normal' },
    { id: '3', url: '3', method: "PATCH", filter_type: 'normal' },
    { id: '4', url: '4', method: "DELETE", filter_type: 'normal' },
    { id: '4', url: '4', method: "PUT", filter_type: 'normal' },
    { id: '4', url: '4', method: "POST", filter_type: 'normal' },
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
        // 设置type
        const setType = () => {
            props.data.filter_type = props.data.filter_type === 'normal' ? 'regex' : 'normal'
        }
        return () =>
            <>
                <div class={styl.row}>
                    <CollapseBtn show={show.value} update={(bool: boolean) => show.value = bool} />
                    <div class={styl.rowInput}>
                        <NInput size="small" placeholder="url">
                            {{
                                suffix: <NIcon size={20} class={[styl.regexIcon, props.data.filter_type === 'regex' ? styl.regexActive : '']}>
                                    <svg onClick={() => setType()} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="300"><path d="M682.666667 721.92C668.586667 724.053333 654.506667 725.333333 640 725.333333 625.493333 725.333333 611.413333 724.053333 597.333333 721.92L597.333333 572.16 490.666667 677.973333C469.333333 661.333333 448 640 431.36 618.666667L537.173333 512 387.413333 512C385.28 497.92 384 483.84 384 469.333333 384 454.826667 385.28 440.746667 387.413333 426.666667L537.173333 426.666667 431.36 320C439.466667 309.333333 448 298.666667 459.093333 288.426667L459.093333 288.426667C469.333333 277.333333 480 268.8 490.666667 260.693333L597.333333 366.506667 597.333333 216.746667C611.413333 214.613333 625.493333 213.333333 640 213.333333 654.506667 213.333333 668.586667 214.613333 682.666667 216.746667L682.666667 366.506667 789.333333 260.693333C810.666667 277.333333 832 298.666667 848.64 320L742.826667 426.666667 892.586667 426.666667C894.72 440.746667 896 454.826667 896 469.333333 896 483.84 894.72 497.92 892.586667 512L742.826667 512 848.64 618.666667C840.533333 629.333333 832 640 820.906667 650.24L820.906667 650.24C810.666667 661.333333 800 669.866667 789.333333 677.973333L682.666667 572.16 682.666667 721.92 682.666667 721.92 682.666667 721.92M213.333333 810.666667C213.333333 763.733333 251.733333 725.333333 298.666667 725.333333 345.6 725.333333 384 763.733333 384 810.666667 384 857.6 345.6 896 298.666667 896 251.733333 896 213.333333 857.6 213.333333 810.666667L213.333333 810.666667Z"></path>
                                    </svg>
                                </NIcon>
                            }}
                        </NInput>
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