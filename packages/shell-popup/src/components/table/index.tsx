import { defineComponent, ref } from "vue";
import { useData } from "@/store/data";
import { NButton, NSwitch, NInput, NSelect, NIcon, NInputGroup, NEmpty } from "naive-ui";
import { CollapseBtn, SetUpRow } from "./tools";
import { ITableRowData } from "@/interfaces";
import styl from "./index.module.scss";

export default defineComponent(() => {

    // const interceptors = ref<ITableRowData[]>(list)
    const store = useData()
    return () => <div class={styl.tableContainer}>
        {
            store.isEmpty
                ?
                <div class={styl.emptyContainer}>
                    <NEmpty size="large"></NEmpty>
                </div>
                :
                store.tableList.map((item) => {
                    return <div class={styl.rowContainer}>
                        <RowContainer data={item} />
                    </div>
                })
        }
    </div>
})

const MethodOptions = [
    { label: "*(any)", value: "ANY", },
    { label: "GET", value: "GET", },
    { label: "POST", value: "POST", },
    { label: "PUT", value: "PUT", },
    { label: "DELETE", value: "DELETE", },
    { label: "PATCH", value: "PATCH", },
];

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
        const store = useData()
        // 设置type
        const setType = () => {
            props.data.filter_type = props.data.filter_type === 'normal' ? 'regex' : 'normal'
        }
        return () =>
            <>
                {/* Label展示 */}
                <div class={styl.rowLabel}>{props.data.label || 'URL'}</div>
                <div class={styl.row}>
                    <CollapseBtn show={props.data.expand} update={(bool: boolean) => props.data.expand = bool} />
                    <div class={styl.rowInput}>
                        <NInputGroup>
                            <NSelect
                                size="small"
                                style={{ width: "120px" }}
                                v-model:value={props.data.method}
                                options={MethodOptions}
                            />
                            <NInput
                                size="small"
                                placeholder="please input url"
                                v-model:value={props.data.match_url}
                            >
                                {{
                                    suffix: () => <NIcon size={20} class={[styl.regexIcon, props.data.filter_type === 'regex' ? styl.regexActive : '']}>
                                        <svg
                                            onClick={() => setType()}
                                            viewBox="0 0 1024 1024"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="300"
                                            height="300">
                                            <path d="M682.666667 721.92C668.586667 724.053333 654.506667 725.333333 640 725.333333 625.493333 725.333333 611.413333 724.053333 597.333333 721.92L597.333333 572.16 490.666667 677.973333C469.333333 661.333333 448 640 431.36 618.666667L537.173333 512 387.413333 512C385.28 497.92 384 483.84 384 469.333333 384 454.826667 385.28 440.746667 387.413333 426.666667L537.173333 426.666667 431.36 320C439.466667 309.333333 448 298.666667 459.093333 288.426667L459.093333 288.426667C469.333333 277.333333 480 268.8 490.666667 260.693333L597.333333 366.506667 597.333333 216.746667C611.413333 214.613333 625.493333 213.333333 640 213.333333 654.506667 213.333333 668.586667 214.613333 682.666667 216.746667L682.666667 366.506667 789.333333 260.693333C810.666667 277.333333 832 298.666667 848.64 320L742.826667 426.666667 892.586667 426.666667C894.72 440.746667 896 454.826667 896 469.333333 896 483.84 894.72 497.92 892.586667 512L742.826667 512 848.64 618.666667C840.533333 629.333333 832 640 820.906667 650.24L820.906667 650.24C810.666667 661.333333 800 669.866667 789.333333 677.973333L682.666667 572.16 682.666667 721.92 682.666667 721.92 682.666667 721.92M213.333333 810.666667C213.333333 763.733333 251.733333 725.333333 298.666667 725.333333 345.6 725.333333 384 763.733333 384 810.666667 384 857.6 345.6 896 298.666667 896 251.733333 896 213.333333 857.6 213.333333 810.666667L213.333333 810.666667Z">
                                            </path>
                                        </svg>
                                    </NIcon>
                                }}
                            </NInput>
                        </NInputGroup>
                    </div>
                    <div class={styl.rowMethodTag}>
                        <div class={styl.options}>{props.data.hit}</div>
                        <NSwitch
                            size="small"
                            round={false}
                            v-model:value={props.data.switch_on}
                            onUpdateValue={(bool: boolean) => store.updateSwitchById(props.data.id, bool)}
                            class={styl.options} />
                    </div>
                </div>
                <div class={styl.rowInfoContainer}>
                    {props.data.expand && <SetUpRow data={props.data} />}
                </div>
            </>
    }
})