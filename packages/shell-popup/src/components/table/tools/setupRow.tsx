import { defineComponent, ref, onMounted, computed } from "vue";
import { NForm, NFormItem, NInput, NIcon } from "naive-ui";
import { ITableRowData } from "@/interfaces";
import { isNumber } from "@alrale/common-lib";

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

        const feedbackErr = ref("")
        // status code error message
        const statusErr = ref("")

        onMounted(() => {
            refOverride.value?.focus()
        })

        const createStatus = (value?: string) => {
            if (!value) {
                statusErr.value = ""
                return undefined
            }
            // 100 - 999
            // status code 200、301、404、500...
            const bool = isNumber(value)
            if (bool) {

                if (value.length !== 3) {
                    statusErr.value = "Please enter the correct status code"
                    return "warning"
                } else {
                    statusErr.value = ""
                    return undefined
                }
            }
            statusErr.value = "Status code is not legal"
            return 'error'
        }

        const handleFormat = () => {
            try {
                props.data.override = JSON.stringify(JSON.parse(props.data.override || ""), null, 2)
                feedbackErr.value = ""
            } catch (error) {
                feedbackErr.value = "Incorrect formatting"
            }
        }

        return () => <>
            <NForm size="small">
                <NFormItem label="Label">
                    {/* 设置Label */}
                    <NInput
                        v-model:value={props.data.label}
                        placeholder="please input label"
                    />
                </NFormItem>
                <NFormItem
                    label="Status"
                    validationStatus={computed(() => createStatus(props.data.statusCode)).value}
                    feedback={statusErr.value}
                >
                    {/* 设置Status */}
                    <NInput
                        maxlength={3}
                        v-model:value={props.data.statusCode}
                        placeholder="200"
                    />
                </NFormItem>
                <NFormItem
                    size="small"
                    label="Override"
                    validationStatus={computed(() => feedbackErr.value ? "error" : undefined).value}
                    feedback={feedbackErr.value}
                >
                    {/*
                        设置Override响应
                        后期Vue3 寻找Json支持友好的编辑器，目前暂时未找到
                    */}
                    <NInput
                        v-model:value={props.data.override}
                        type="textarea"
                        rows={10}
                        ref={refOverride}
                        placeholder="please input override"
                    >
                        {{
                            suffix: () => <NIcon size={17} style={{
                                fill: "#606266",
                                cursor: "pointer",
                            }}>
                                <span title="Format" onClick={handleFormat}>
                                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="300">
                                        <path d="M917.333333 186.666667a5.333333 5.333333 0 0 0-5.333333-5.333334H112a5.333333 5.333333 0 0 0-5.333333 5.333334v64a5.333333 5.333333 0 0 0 5.333333 5.333333h800a5.333333 5.333333 0 0 0 5.333333-5.333333zM106.666667 773.333333v64a5.333333 5.333333 0 0 0 5.333333 5.333334h394.666667a5.333333 5.333333 0 0 0 5.333333-5.333334v-64a5.333333 5.333333 0 0 0-5.333333-5.333333H112a5.333333 5.333333 0 0 0-5.333333 5.333333zM512 474.666667H112a5.333333 5.333333 0 0 0-5.333333 5.333333v64a5.333333 5.333333 0 0 0 5.333333 5.333333h800a5.333333 5.333333 0 0 0 5.333333-5.333333V480a5.333333 5.333333 0 0 0-5.333333-5.333333z">
                                        </path>
                                    </svg>
                                </span>
                            </NIcon>
                        }}
                    </NInput>
                </NFormItem>
            </NForm>
        </>
    }
})