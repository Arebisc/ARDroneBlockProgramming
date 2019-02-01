import Vue from 'vue';
import Router from 'vue-router';

import Home from './components/Home/Home.vue';
import Navdata from './components/Navdata/Navdata.vue';

Vue.use(Router);

export default new Router({ 
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/navdata',
            name: 'navdata',
            component: Navdata
        }
    ]
});

