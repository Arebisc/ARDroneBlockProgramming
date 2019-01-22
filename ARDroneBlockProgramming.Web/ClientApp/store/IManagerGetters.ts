import { DroneNavData, DroneEstimatedPosition } from './../Helpers/DroneNavdata';
import { DroneAction } from '../classes/DroneAction';


export interface IManagerGetters {
    droneActions: Array<DroneAction>;
    droneSees: string[];
    droneActionStateCounter: number;
    dronePosition: DroneEstimatedPosition;
}