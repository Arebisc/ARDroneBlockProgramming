import './css/site.css';
import Vue from 'vue';
import store from './store';
import router from './router'

import App from './App.vue';

Vue.config.productionTip = true;
Vue.config.devtools = true;


new Vue({
    el: '#app',
    store: store,
    router: router,
    render: h => h(App)
});