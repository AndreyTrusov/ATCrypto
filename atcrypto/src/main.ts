import './assets/css/bootstrap.css'
import './assets/css/font-awesome.min.css'
import './assets/css/responsive.css'
import './assets/css/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import {PriceUpdaterService} from "@/services/priceUpdater.ts";
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
    components,
    directives,
});

const priceUpdater = new PriceUpdaterService({
    apiUrl: 'http://localhost:3000/api',
    intervalMs: 8000,
    minChangePercent: 0.5,
    maxChangePercent: 3
});

priceUpdater.start();

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify);

app.mount('#app')
