import { ManagerState } from './ManagerState';
import { ActionTree } from 'vuex';


const actions: ActionTree<ManagerState, ManagerState> = {
  sendActionsToAPI({commit}): Promise<String> {
    return new Promise((resolve, reject) => {
      // TODO
      
      console.log('dispatched');
      resolve("something happen!");
    });
  }
}

export default actions;