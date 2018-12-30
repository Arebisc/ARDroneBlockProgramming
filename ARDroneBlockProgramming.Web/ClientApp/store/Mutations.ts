import { ManagerState } from './ManagerState';
import { MutationTree } from 'vuex';


const mutations: MutationTree<ManagerState> = {
    SET_DRONE_SEES(state, payload: string[]) {
        state.droneSees = payload;
    },

    INCREMENT_ACTION_COUNTER(state) {
        state.droneActionStateCounter++;
    },

    RESET_ACTION_COUNTER(state) {
        state.droneActionStateCounter = 0;
    },

    SET_NAVDATA(state, payload) {
        state.droneNavdata = payload;
    }
}

export default mutations;