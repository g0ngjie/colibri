import { defineComponent } from "vue";
import { NConfigProvider, NEmpty, NSpace } from "naive-ui";
import { useTheme } from "./store/theme";

export default defineComponent(() => {
    const themeStore = useTheme()
    return () => <NConfigProvider
        theme={themeStore.theme}
    >
        <NSpace vertical style={{ marginTop: "150px" }}>
            <NEmpty size="large" description="No options on current page"></NEmpty>
        </NSpace>
    </NConfigProvider>
})