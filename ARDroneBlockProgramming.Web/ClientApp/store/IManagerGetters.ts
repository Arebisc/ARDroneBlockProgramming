import { DroneNavData } from './../Helpers/DroneNavdata';
import { DroneAction } from '../classes/DroneAction';


export interface IManagerGetters {
    droneActions: Array<DroneAction>;
    droneSees: string[];
    droneActionStateCounter: number;
    droneNavdata: DroneNavData;
}