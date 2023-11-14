import { createApp } from 'vue'
import App from './App'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus).mount('#vue')
