import { ManagerState } from './ManagerState';
import { MutationTree } from 'vuex';


const mutations: MutationTree<ManagerState> = {
    SET_DRONE_SEES(state, payload: string[]) {
        state.droneSees = payload;
    }
}

export default mutations;