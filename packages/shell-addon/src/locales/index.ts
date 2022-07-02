import { createI18n } from "vue-i18n";
import { zhCN as uiZhCN, enUS as uiEnUS } from "naive-ui/lib/locales";

import en from "./en";
import zhCN from "./zh_CN";

export default createI18n({
    locale: "en",
    allowComposition: true, // you need to specify that!
    messages: {
        'zh-CN': { ...zhCN },
        'en': { ...en }
    }
})

export const Langs = [
    { value: 'en', label: 'English' },
    { value: 'zh-CN', label: '简体中文' },
]
