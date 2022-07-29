import { defineComponent } from "vue";
import { NTag } from "naive-ui";
import type { IRequestMethod } from "@colibri/lib.v2";

type TagType = "default" | "error" | "primary" | "info" | "success" | "warning";

// 协议颜色
const mapTagColor: { [key: string]: TagType } = {
    "*": "primary",
    "GET": "success",
    "POST": "warning",
    "PUT": "info",
    "DELETE": "error",
    "PATCH": "default",
    "HEAD": "default",
    "OPTIONS": "default",
    "TRACE": "default",
    "CONNECT": "default",
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
            <NTag size="small" type={mapTagColor[props.method.toUpperCase()]} class="bg-zinc-2 font-bold">{
                props.method === "*" ? "*(any)" : props.method.toUpperCase()
            }</NTag>
        </>
    }
})