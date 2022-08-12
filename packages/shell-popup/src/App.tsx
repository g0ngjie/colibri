import { defineComponent } from "vue";
import { NConfigProvider, GlobalThemeOverrides, NDialogProvider } from "naive-ui";
import Index from "./components/index";
import i18n from "./locales";
import { useLocale } from "./store/locale";
import { useTheme } from "./store/theme";


export default defineComponent(() => {
    const { useLang } = useLocale()
    const themeStore = useTheme()
    // console.log(useLang, 'useLang')
    const themeOverrides: GlobalThemeOverrides = {
        common: {
            primaryColor: '#08979c'
        },
    }
    return () => <NConfigProvider
        theme={themeStore.theme}
        themeOverrides={themeOverrides}
    >
        <NDialogProvider>
            <Index />
        </NDialogProvider>
    </NConfigProvider>
})