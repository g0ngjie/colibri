import { defineComponent } from "vue";
import { NConfigProvider, GlobalThemeOverrides } from "naive-ui";
import Index from "./components/index";


export default defineComponent(() => {
    const themeOverrides: GlobalThemeOverrides = {
        common: {
            primaryColor: '#08979c'
        },
    }
    return () => <NConfigProvider themeOverrides={themeOverrides}>
        <Index />
    </NConfigProvider>
})