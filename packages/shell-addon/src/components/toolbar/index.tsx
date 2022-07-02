import { defineComponent } from "vue";
import { NButton, NIcon, NSpace, NSwitch } from "naive-ui";
import { useI18n } from "vue-i18n";
import { WeatherSunny20Regular, WeatherMoon20Regular } from "@vicons/fluent";

// 工具栏: 全局开关 国际化 主题
export default defineComponent(() => {

    const { t } = useI18n()
    return () => <>
        <NSpace justify="space-between" class="px3 pt3">
            <NSwitch size="small" round={false} />
            <NSpace align="center">
                <NIcon size={20} class="hover:cursor-pointer">
                    <WeatherSunny20Regular />
                </NIcon>
                <NIcon size={18} class="hover:cursor-pointer">
                    <WeatherMoon20Regular />
                </NIcon>
            </NSpace>
        </NSpace>
        <NSpace class="px3 pt3">
            <NButton size="tiny">{t('create')}</NButton>
        </NSpace>
    </>
})
