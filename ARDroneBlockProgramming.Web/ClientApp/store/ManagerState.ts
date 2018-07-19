import { DroneAction } from '../classes/DroneAction';


export class ManagerState {
    api: String = "http://localhost:5026";
    droneActions: Array<DroneAction> =  [];
}