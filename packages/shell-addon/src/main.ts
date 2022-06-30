import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App'

createApp(App).use(createPinia()).mount('#app')
