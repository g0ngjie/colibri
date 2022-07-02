import { defineComponent } from "vue";
import { useData } from "../store/data";
import { NButton } from "naive-ui";

// 工具栏: 全局开关 国际化 主题
export default defineComponent(() => {

    const store = useData()
    return () => <div>{store.title}test one
        <NButton>btn</NButton>
    </div>
})