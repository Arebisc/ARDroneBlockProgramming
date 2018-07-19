import { ManagerState } from './ManagerState';
import Vuex from "vuex";
import Vue from "vue";
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);


export const Store = new Vuex.Store<ManagerState>({
    state: new ManagerState(),
    mutations: mutations,
    actions: actions,
    getters: getters
});