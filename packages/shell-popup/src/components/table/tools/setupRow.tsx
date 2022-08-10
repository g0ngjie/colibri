import { defineComponent } from "vue";
import { NForm, NFormItem, NInput, NSelect } from "naive-ui";
import { ITableRowData } from "@/interfaces";
import { IRequestMethod } from "@colibri/lib.v2";
import styl from "./style.module.scss";

type TagType = "default" | "error" | "primary" | "info" | "success" | "warning";

const MethodOptions = [
    { label: "*(any)", value: "ANY", },
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
                <NFormItem label="Method">
                    <NSelect options={MethodOptions} class={styl.formItemWidth}></NSelect>
                </NFormItem>
                <NFormItem label="Label">
                    <NInput class={styl.formItemWidth}></NInput>
                </NFormItem>
            </NForm>
            <NInput type="textarea"></NInput>
        </>
    }
})