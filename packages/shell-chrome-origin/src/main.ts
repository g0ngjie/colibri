import { createApp } from 'vue'
import App from './App.vue'
import './reset.css'
import lib from "colibri-lib";

lib.update({
    switch_on: true,
    matching_content: [
        {
            switch_on: true,
            match_url: 'http://fakeapi.jsonparseronline.com/users/1',
            override: JSON.stringify({ ok: true, text: "拦截成功" }),
        }
    ]
})
createApp(App).mount('#app')
