import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import VTooltip from 'v-tooltip';
import store from './store';
import './assets/global.css';

createApp(App).use(store).use(VTooltip).mount('#app');