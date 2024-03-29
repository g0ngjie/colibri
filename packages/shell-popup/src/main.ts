import { createApp } from 'vue'
import { createPinia } from "pinia";
import i18n from "./locales";
import App from './App'
// import Empty from "./Empty";

import { initStorage } from "@colibri/shared-utils";

initStorage()
    .then(() => createApp(App)
        .use(i18n)
        .use(createPinia())
        .mount('#app')
    )
