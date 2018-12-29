import { DroneAction } from './../classes/DroneAction';
import { ActionTree } from 'vuex';
import { ManagerState } from './ManagerState';
import axios, { AxiosResponse } from 'axios';


const actions: ActionTree<ManagerState, ManagerState> = {
    sendActionsToAPI({commit, state}, actions: DroneAction[]): Promise<AxiosResponse> {
        return new Promise((resolve, reject) => {
            const droneActionsEndpoint = state.api + '/api/Drone';

            axios.post(droneActionsEndpoint, actions)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            })
        });
    },

    setTagsWhichDroneSees({commit, state}, tags: string[]) {
        commit('SET_DRONE_SEES', tags);
    },

    incrementActionCounter({commit, state}) {
        commit('INCREMENT_ACTION_COUNTER');
    },

    resetActionCounter({commit, state}) {
        commit('RESET_ACTION_COUNTER');
    }
}

export default actions;