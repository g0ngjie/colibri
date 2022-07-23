import { defineComponent, ref } from "vue";
import { useData } from "../store/data";
import { NButton, NDataTable, NSpace, NSwitch, NCollapseTransition } from "naive-ui";
import type { DataTableColumns } from "naive-ui"
import { IMatchContent, IRequestMethod } from "@colibri/lib.v2/types/types";
import { CollapseBtn, MethodTag } from "./tools";

const list: IRowProps[] = [
    { id: '1', url: '1', method: 'GET' },
    { id: '2', url: '2', method: '*' },
    { id: '3', url: '3', method: "PATCH" },
    { id: '4', url: '4', method: "DELETE" },
    { id: '4', url: '4', method: "TRACE" },
    { id: '4', url: '4', method: "PUT" },
    { id: '4', url: '4', method: "CONNECT" },
    { id: '4', url: '4', method: "OPTIONS" },
    { id: '4', url: '4', method: "HEAD" },
    { id: '4', url: '4', method: "POST" },
]

interface IRowProps {
    id: string, url: string, method: IRequestMethod
}

export default defineComponent(() => {

    const interceptors = ref<IRowProps[]>(list)
    const store = useData()
    return () => <div class="bg-gray-1">
        {
            interceptors.value.map((item) => {
                return <div class="flex flex-col m1 py-1 pb-5 px-2 b-b b-zinc-3">
                    <RowContainer data={item} />
                </div>
            })
        }
    </div>
})



interface IRowContainerProps {
    data: IRowProps
}

const RowContainer = defineComponent({
    props: {
        data: {
            type: Object as () => IRowProps,
            required: true,
        }
    },
    setup(props) {
        const show = ref(false)
        return () =>
            <div class="flex">
                <div class="flex-1 m1 py-1 px-2 b-b b-zinc-4 hover-border-color-slate-6">
                    <CollapseBtn show={show.value} update={(bool: boolean) => show.value = bool} />
                    <NCollapseTransition show={show.value}>
                        {props.data.url}
                    </NCollapseTransition>
                </div>
                <div class="w50">
                    <MethodTag method={props.data.method} />
                </div>
            </div>
    }
})