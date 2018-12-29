import { DroneAction } from './../classes/DroneAction';
import { ActionTree } from 'vuex';
import { ManagerState } from './ManagerState';
import axios, { AxiosResponse } from 'axios';
import { toBase64 } from '../helpers/Base64Helper';


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

    savePngBuffer({commit, state}, buffer: Uint8Array) {
        // commit('SET_PNG_BUFFER', toBase64(buffer));
        commit('SET_PNG_BUFFER', buffer);
    }
}

export default actions;