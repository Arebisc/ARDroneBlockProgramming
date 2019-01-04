import { DroneNavData } from './../Helpers/DroneNavdata';
import { DroneAction } from '../classes/DroneAction';


export class ManagerState {
    api: String = "http://localhost:5026";
    droneActions: Array<DroneAction> =  [];
    droneSees: string[] = [];
    droneActionStateCounter: number = 0;
    // @ts-ignore
    droneNavdata: DroneNavData = {};
}