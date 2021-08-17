import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import Api from './API'

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$API = Api
app.mount('#app')
