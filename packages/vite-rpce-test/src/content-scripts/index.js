import { createApp } from 'vue'
import HelloWorld from '../components/HelloWorld.vue'

const root = document.createElement('div')
root.id = '#rpce-app'

document.body.append(root)

createApp(HelloWorld).mount(root)
