import { defineComponent } from "vue";
import { useData } from "../store/data";
import { NButton } from "naive-ui";
import { useI18n } from "vue-i18n";

// 工具栏: 全局开关 国际化 主题
export default defineComponent(() => {

    const { t } = useI18n()
    const store = useData()
    return () => <div>{store.title}test one
        <NButton>{ t('title') }</NButton>
    </div>
})