import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Set the base URL for axios
axios.defaults.baseURL = 'http://localhost:9100/' // เปลี่ยนเป็น URL ของ backend ของคุณ

createApp(App).use(router).mount('#app')
