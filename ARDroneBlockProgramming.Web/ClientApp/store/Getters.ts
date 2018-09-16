import { IManagerGetters } from './IManagerGetters';
import { ManagerState } from './ManagerState';
import { GetterTree } from 'vuex/types';


const getters: GetterTree<ManagerState, ManagerState> = {
    droneActions: (state: ManagerState, getters: IManagerGetters) => state.droneActions,
    droneSees: (state: ManagerState, getters: IManagerGetters) => state.droneSees
}

export default getters;