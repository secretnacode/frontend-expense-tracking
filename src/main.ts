import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import LandingView from './modules/hero/views/LandingView.vue'

const app = createApp(LandingView)

app.use(createPinia())
app.use(router)

app.mount('#app')
