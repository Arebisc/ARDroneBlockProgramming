import { ActionTree } from 'vuex';
import { ManagerState } from './ManagerState';


const actions: ActionTree<ManagerState, ManagerState> = {
    sendActionsToAPI({commit}): Promise<String> {
        return new Promise((resolve, reject) => {
            console.log('dispatched');
            resolve("something happen!");
        });
    }
}

export default actions;