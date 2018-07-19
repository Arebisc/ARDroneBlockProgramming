import { DroneAction } from './../classes/DroneAction';
import { ActionTree } from 'vuex';
import { ManagerState } from './ManagerState';
import axios from 'axios';


const actions: ActionTree<ManagerState, ManagerState> = {
    sendActionsToAPI({commit, state}, actions: DroneAction[]): Promise<String> {
        return new Promise((resolve, reject) => {

        });
    }
}

export default actions;