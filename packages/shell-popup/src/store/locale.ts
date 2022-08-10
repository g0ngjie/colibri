
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { StorageKey, setStorage, getStorage } from '@colibri/shared-utils'

type Locale = "en" | "zh-CN" | "zh-TW" | "zh";

export const useLocale = defineStore('locale', () => {
    const language = ref<Locale>("en");

    // 语言切换
    const changeLanguage = (lang: Locale) => {
        switch (lang) {
            case "zh-CN":
            case "zh":
                language.value = "zh-CN"
                break;
            default:
                language.value = "en"
                break;
        }
        syncLangurage(language.value)
    }
    // 更新本地语言
    const syncLangurage = (lang: Locale) => {
        setStorage(StorageKey.LANGUAGE, lang)
    }
    // 初始化本地语言
    const initLang = () => {
        const storeLang = getStorage(StorageKey.LANGUAGE, "zh-CN")
        language.value = storeLang
    }

    initLang()

    const useLang = computed(() => language.value)

    return {
        useLang,
        syncLangurage,
        changeLanguage,
    }
})