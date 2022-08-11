import { defineComponent, ref, onMounted } from "vue";
import { NForm, NFormItem, NInput, NSelect } from "naive-ui";
import { ITableRowData } from "@/interfaces";
import styl from "./style.module.scss";

export default defineComponent({
    props: {
        data: {
            type: Object as () => ITableRowData,
            required: true,
        }
    },
    setup(props) {
        const refOverride = ref()

        onMounted(() => {
            refOverride.value?.focus()
        })

        return () => <>
            <NForm size="small">
                <NFormItem label="Label">
                    <NInput
                        v-model:value={props.data.label}
                        placeholder="please input label"
                    />
                </NFormItem>
                <NFormItem size="small" label="Override">
                    <NInput
                        v-model:value={props.data.override}
                        type="textarea"
                        rows={10}
                        ref={refOverride}
                        placeholder="please input override"
                    />
                </NFormItem>
            </NForm>
        </>
    }
})