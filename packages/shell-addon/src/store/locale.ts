
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { StorageKeys, setStorage, getStorage, initStorage } from '@colibri/shared-utils'

type Locale = "en" | "zh-CN" | "zh-TW" | "zh";

export const useLocale = defineStore('locale', () => {
    const language = ref<Locale>("zh-CN");

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
        setStorage(StorageKeys.LANGUAGE, lang)
    }
    // 初始化本地语言
    const initLang = () => {
        const storeLang = getStorage(StorageKeys.LANGUAGE, "en")
        language.value = storeLang
    }

    initStorage().then(() => {
        initLang()
    })
    const useLang = computed(() => language.value)

    return {
        useLang,
        syncLangurage,
        changeLanguage,
    }
})