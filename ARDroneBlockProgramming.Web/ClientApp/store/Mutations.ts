import { ManagerState } from './ManagerState';
import { MutationTree } from 'vuex';


const mutations: MutationTree<ManagerState> = {
    SET_DRONE_SEES(state, payload: string[]) {
        state.droneSees = payload;
    },

    SET_PNG_BUFFER(state, payload: string) {
        state.pngBufferBase64 = payload;
    }
}

export default mutations;