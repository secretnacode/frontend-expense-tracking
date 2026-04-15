import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import LandingPage from './modules/landing/views/LandingPage.vue'

const app = createApp(LandingPage)

app.use(createPinia())
app.use(router)

app.mount('#app')
