import { createApp } from 'vue'
import { createPinia } from "pinia";
import i18n from "./locales";
import App from './App'

import { initStorage, useCurrentTab } from "@colibri/shared-utils";

useCurrentTab()
    .then(tab => {
        console.log("[debug]tab:", tab)
        // 判断是否是正常的标签页
        // 非正常: edge://extensions/
        if (tab?.url) {
            initStorage()
                .then(() => createApp(App)
                    .use(i18n)
                    .use(createPinia())
                    .mount('#app')
                )
        }
    })
