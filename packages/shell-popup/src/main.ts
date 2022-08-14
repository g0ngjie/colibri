import { createApp } from 'vue'
import { createPinia } from "pinia";
import i18n from "./locales";
import App from './App'
import Empty from "./Empty";

import { initStorage, useCurrentTab } from "@colibri/shared-utils";

// useCurrentTab().then(tab => {
//     initStorage()
//         .then(() => createApp(tab?.url ? App : Empty)
//             .use(i18n)
//             .use(createPinia())
//             .mount('#app')
//         )
// })

useCurrentTab().then(tab => {
    initStorage()
        .then(() => createApp(App)
            .use(i18n)
            .use(createPinia())
            .mount('#app')
        )
})
