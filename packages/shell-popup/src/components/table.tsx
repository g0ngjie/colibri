import { defineComponent, ref } from "vue";
import { useData } from "../store/data";
import { NButton, NDataTable, NSpace, NSwitch, NCollapseTransition } from "naive-ui";
import type { DataTableColumns } from "naive-ui"
import { IMatchContent } from "@colibri/lib.v2/types/types";
import CollapseBtn from "./tools/collapseBtn";

const list = [
    { id: '1', url: '1' },
    { id: '2', url: '2' },
    { id: '3', url: '3' },
    { id: '4', url: '4' },
]

export default defineComponent(() => {

    const interceptors = ref(list)
    const store = useData()
    return () => <>
        {
            interceptors.value.map((item) => {
                return <div class="flex flex-col m1 py-1 px-2 b-b b-zinc-400 hover-border-color-slate-9">
                    <RowContainer data={item} />
                </div>
            })
        }
    </>
})

interface IRowContainerProps {
    data: { id: string, url: string }
}

const RowContainer = defineComponent({
    props: {
        data: {
            type: Object as () => IRowContainerProps['data'],
            required: true,
        }
    },
    setup(props) {
        const show = ref(false)
        return () => <>
            <CollapseBtn show={show.value} update={(bool: boolean) => show.value = bool} />
            <NCollapseTransition show={show.value}>
                {props.data.url}
            </NCollapseTransition>
        </>
    }
})