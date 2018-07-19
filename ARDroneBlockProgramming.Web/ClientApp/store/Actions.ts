import { ActionTree } from 'vuex';
import { ManagerState } from './ManagerState';


const actions: ActionTree<ManagerState, ManagerState> = {
    sendActionsToAPI({commit}): Promise<String> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('dispatched');
                resolve("something happen!");
            }, 3000);
        });
    }
}

export default actions;