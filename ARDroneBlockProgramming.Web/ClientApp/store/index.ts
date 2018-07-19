import { ManagerState } from './ManagerState';
import Vuex from "vuex";
import Vue from "vue";
import mutations from './Mutations';
import actions from './Actions';
import getters from './Getters';

Vue.use(Vuex);


export const Store = new Vuex.Store<ManagerState>({
    state: new ManagerState(),
    mutations: mutations,
    actions: actions,
    getters: getters
});