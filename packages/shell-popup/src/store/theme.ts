
import { ref, onBeforeMount } from "vue";
import { defineStore } from "pinia";
import { darkTheme, lightTheme } from "naive-ui";
import { Theme, getStorage, setStorage, StorageKey } from "@colibri/shared-utils";

function setBg(color: string) {
    document.documentElement.style.setProperty('--ajax-proxy-v3-global-theme-color', color)
}

export const useTheme = defineStore('theme', () => {
    const theme = ref(lightTheme)
    const isDark = ref(false)

    // 初始化加载
    onBeforeMount(() => {
        const localTheme = getStorage(StorageKey.THEME, Theme.LIGHT)
        if (localTheme === Theme.DARK) {
            isDark.value = true
            setBg('rgba(24, 24, 28, .9)')
            theme.value = darkTheme
        }
    })

    function setTheme(type: string) {
        const { DARK, LIGHT } = Theme
        switch (type) {
            case DARK:
                // 同步主题
                setStorage(StorageKey.THEME, Theme.DARK)
                isDark.value = true
                theme.value = darkTheme
                setBg('rgba(24, 24, 28, .9)');
                break;
            case LIGHT:
                // 同步主题
                setStorage(StorageKey.THEME, Theme.LIGHT)
                isDark.value = false
                setBg('#ffffff');
                theme.value = lightTheme
                break;
        }
    }
    return { theme, isDark, setTheme }
})