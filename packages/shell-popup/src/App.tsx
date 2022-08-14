import { defineComponent } from "vue";
import { NConfigProvider, GlobalThemeOverrides, NDialogProvider } from "naive-ui";
import { zhCN, enUS, zhTW, dateZhCN, dateEnUS, dateZhTW } from "naive-ui/lib/locales";
import Index from "./components/index";
import { useLocale } from "./store/locale";
import { useTheme } from "./store/theme";

export default defineComponent(() => {
    const { useLang } = useLocale()

    const themeStore = useTheme()
    const themeOverrides: GlobalThemeOverrides = {
        common: {
            primaryColor: '#08979c'
        },
    }

    return () => <NConfigProvider
        theme={themeStore.theme}
        themeOverrides={themeOverrides}
        dateLocale={
            {
                'zh-CN': dateZhCN,
                'zh-TW': dateZhTW,
                'zh': dateZhCN,
                'en': dateEnUS,
            }[useLang]
        }
        locale={
            {
                'zh-CN': zhCN,
                'zh-TW': zhTW,
                'zh': zhCN,
                'en': enUS,
            }[useLang]
        }
    >
        <NDialogProvider>
            <Index />
        </NDialogProvider>
    </NConfigProvider>
})