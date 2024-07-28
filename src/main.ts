import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";

// добавляем необходимую конфигурацию axios:
axios.defaults.baseURL='http://127.0.0.1:3000/api/';  // базовый URL, все запросы будут использовать его в качестве префикса
axios.defaults.withCredentials=true;// по умолчанию использовать креды, поскольку

createApp(App).use(store).use(router).mount('#app')
