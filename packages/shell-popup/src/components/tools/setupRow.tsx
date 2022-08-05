import { defineComponent } from "vue";
import { NForm, NFormItem, NInput, NSelect } from "naive-ui";
import { ITableRowData } from "../../interfaces";
import { IRequestMethod } from "@colibri/lib.v2";

type TagType = "default" | "error" | "primary" | "info" | "success" | "warning";

const MethodOptions = [
    { label: "ANY", value: "ANY", },
    { label: "GET", value: "GET", },
    { label: "POST", value: "POST", },
    { label: "PUT", value: "PUT", },
    { label: "DELETE", value: "DELETE", },
    { label: "PATCH", value: "PATCH", },
];

export default defineComponent({
    props: {
        data: {
            type: Object as () => ITableRowData,
            required: true,
        }
    },
    setup(props) {
        return () => <>
            <NForm size="small" inline>
                <NFormItem label="Label">
                    <NInput class="w50"></NInput>
                </NFormItem>
                <NFormItem label="Method">
                    <NSelect options={MethodOptions} class="w50"></NSelect>
                </NFormItem>
            </NForm>
        </>
    }
})