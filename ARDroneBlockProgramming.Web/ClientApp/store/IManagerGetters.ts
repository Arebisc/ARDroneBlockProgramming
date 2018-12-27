import { DroneAction } from '../classes/DroneAction';


export interface IManagerGetters {
    droneActions: Array<DroneAction>;
    droneSees: string[];
    pngBufferBase64: string;
}