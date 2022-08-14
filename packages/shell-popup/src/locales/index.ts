import { createI18n } from "vue-i18n";

import en from "./en";
import zhCN from "./zh-CN";
import zhTW from './zh-TW';

export default createI18n({
    locale: "en",
    allowComposition: true, // you need to specify that!
    legacy: false,
    globalInjection: true,
    messages: {
        'zh-CN': zhCN,
        'zh-TW': zhTW,
        'en': en
    }
})

export const Langs = [
    { value: 'en', label: 'English' },
    { value: 'zh-CN', label: '简体中文' },
    { value: 'zh-TW', label: '繁體中文' },
]
