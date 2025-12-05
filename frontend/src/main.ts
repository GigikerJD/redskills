import { createApp } from 'vue'
import './style.css'
import 'notivue/notification.css' // Only needed if using built-in notifications
import 'notivue/animations.css' // Only needed if using built-in animations
import App from './App.vue'
import router from './config/router'
import { createPinia } from 'pinia'
import { createNotivue } from 'notivue'

const pinia = createPinia();
const notivue = createNotivue();

createApp(App)
    .use(router)
    .use(pinia)
    .use(notivue)
    .mount('#app')
