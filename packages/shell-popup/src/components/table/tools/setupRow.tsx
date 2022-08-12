import { defineComponent, ref, onMounted } from "vue";
import { NForm, NFormItem, NInput } from "naive-ui";
import { ITableRowData } from "@/interfaces";

// 展开面板设置项
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
                    {/* 设置Label */}
                    <NInput
                        v-model:value={props.data.label}
                        placeholder="please input label"
                    />
                </NFormItem>
                <NFormItem size="small" label="Override">
                    {/* 设置Override响应 */}
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