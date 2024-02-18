import './assets/main.css'
import Cookies from 'js-cookie';
import {v4 as uuid} from 'uuid';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPlug from "pinia-plugin-persistedstate";


import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';

import App from './App.vue'
import router from './router'

import './access/index.js'

import naive from 'naive-ui'
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_GLOB_API_URL
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;

if (Cookies.get('cookiesId') === undefined){
  Cookies.set('cookiesId', uuid(), { expires: 7 });
}



const pinia = createPinia()
pinia.use(piniaPlug)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(naive)

app.mount('#app')
