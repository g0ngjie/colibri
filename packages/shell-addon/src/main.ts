import { createApp } from 'vue'
import { createPinia } from "pinia";
import i18n from "./locales";
import App from './App'
import 'uno.css'

createApp(App).use(i18n).use(createPinia()).mount('#app')
