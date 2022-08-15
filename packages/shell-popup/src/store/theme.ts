
import { ref, onBeforeMount } from "vue";
import { defineStore } from "pinia";
import { darkTheme, lightTheme } from "naive-ui";
import { Theme, getStorage, setStorage, StorageKey } from "@colibri/shared-utils";

function setBg(colorKey: string) {
    const colorMap = {
        [Theme.DARK]: {
            bg: 'rgba(24, 24, 28, .9)',
            table: 'rgba(24, 24, 28, .5)',
            border: '#8e8e93'
        },
        [Theme.LIGHT]: {
            bg: '#fcfcfc',
            table: '#f3f4f6',
            border: '#d4d4d8'
        }
    }
    document.documentElement.style.setProperty('--ajax-proxy-v3-global-theme-color', colorMap[colorKey].bg);
    document.documentElement.style.setProperty('--ajax-proxy-v3-table-theme-color', colorMap[colorKey].table);
    document.documentElement.style.setProperty('--ajax-proxy-v3-border-theme-color', colorMap[colorKey].border);
}

export const useTheme = defineStore('theme', () => {
    const theme = ref(lightTheme)
    const isDark = ref(false)

    // 初始化加载
    onBeforeMount(() => {
        const localTheme = getStorage(StorageKey.THEME, Theme.LIGHT)
        if (localTheme === Theme.DARK) {
            isDark.value = true
            setBg(Theme.DARK)
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
                setBg(Theme.DARK)
                break;
            case LIGHT:
                // 同步主题
                setStorage(StorageKey.THEME, Theme.LIGHT)
                isDark.value = false
                setBg(Theme.LIGHT);
                theme.value = lightTheme
                break;
        }
    }
    return { theme, isDark, setTheme }
})