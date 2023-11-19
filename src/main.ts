import './assets/main.css'
import 'virtual:uno.css'

import piniaPluginPersist from 'pinia-plugin-persistedstate'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersist))
app.use(router)

app.mount('#app')
