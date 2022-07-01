import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App'
import 'uno.css'

createApp(App).use(createPinia()).mount('#app')
