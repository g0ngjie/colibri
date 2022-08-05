import { defineComponent } from "vue";
import { NTag } from "naive-ui";
import type { IRequestMethod } from "@colibri/lib.v2";
import styl from "./style.module.scss";

type TagType = "default" | "error" | "primary" | "info" | "success" | "warning";

// 协议颜色
const mapTagColor: { [key: string]: TagType } = {
    "ANY": "primary",
    "GET": "success",
    "POST": "warning",
    "PUT": "info",
    "DELETE": "error",
    "PATCH": "default",
}

export default defineComponent({
    props: {
        method: {
            type: String as () => IRequestMethod,
            required: true,
        }
    },
    setup(props) {
        return () => <>
            <NTag size="small" type={mapTagColor[props.method.toUpperCase()]} class={styl.methodTag}>{
                props.method === "ANY" ? "*(any)" : props.method.toUpperCase()
            }</NTag>
        </>
    }
})