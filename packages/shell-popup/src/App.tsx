import { defineComponent } from "vue";
import { NConfigProvider, GlobalThemeOverrides, NDialogProvider } from "naive-ui";
import Index from "./components/index";
import { useLocale } from "./store/locale";
import { useTheme } from "./store/theme";

export default defineComponent(() => {
    const { useLang } = useLocale()
    console.log(useLang, 'useLang')

    const themeStore = useTheme()
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