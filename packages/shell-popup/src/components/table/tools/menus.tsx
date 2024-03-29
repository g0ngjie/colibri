import { defineComponent } from "vue";
import { NIcon, NPopselect } from "naive-ui";
import { useData } from "@/store/data";
import styl from "./style.module.scss";

export default defineComponent({
    props: {
        id: {
            type: String as () => string,
            required: true,
        },
    },
    setup(props) {
        const store = useData();
        const handleChange = (value: 'delete' | 'duplicate' | 'top' | 'bottom') => {
            switch (value) {
                // 删除
                case 'delete':
                    store.removeById(props.id);
                    break;
                // 复制
                case 'duplicate':
                    store.duplicateById(props.id);
                    break;
                // 上移位
                case 'top':
                    store.moveUpById(props.id);
                    break;
                // 下移位
                case 'bottom':
                    store.moveDownById(props.id);
                    break;
            }
        }

        return () => <>
            <NPopselect
                size="small"
                onUpdate:value={handleChange}
                options={
                    [
                        { label: "Delete", value: "delete", },
                        { label: "Duplicate", value: "duplicate", },
                        { label: "Move to top", value: "top", },
                        { label: "Move to bottom", value: "bottom", },
                    ]
                }>
                <NIcon size={20} class={styl.icon}>
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="300">
                        <path d="M510.583233 336.595085c39.638789 0 71.828932-32.160467 71.828932-71.830979s-32.190143-71.829955-71.828932-71.829955c-39.702234 0-71.830979 32.159444-71.830979 71.829955S470.880999 336.595085 510.583233 336.595085M510.583233 408.42504c-39.702234 0-71.830979 32.160467-71.830979 71.830979 0 39.669488 32.128745 71.797209 71.830979 71.797209 39.638789 0 71.828932-32.127721 71.828932-71.797209C582.412165 440.585507 550.222021 408.42504 510.583233 408.42504M510.583233 623.88523c-39.702234 0-71.830979 32.191166-71.830979 71.828932 0 39.703257 32.128745 71.830979 71.830979 71.830979 39.638789 0 71.828932-32.127721 71.828932-71.830979C582.412165 656.076396 550.222021 623.88523 510.583233 623.88523">
                        </path>
                    </svg>
                </NIcon>
            </NPopselect>
        </>;
    }
})