import './css/site.css';
import Vue from 'vue';
import Store from './store';
import Router from './router';
import Vuetify from 'vuetify';

import App from './App.vue';

Vue.config.productionTip = true;
Vue.config.devtools = true;


Vue.use(Vuetify);

new Vue({
    el: '#app',
    store: Store,
    router: Router,
    render: h => h(App)
});