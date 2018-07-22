import { DroneAction } from './classes/droneAction';
import * as arDrone from 'ar-drone';

export class DroneOperator {
    private _client: arDrone.Client;

    public constructor(droneIp: string = "192.168.1.1") {
        this._client = arDrone.createClient({
            ip: droneIp
        });
    }

    public async runActions(droneActions: DroneAction[]): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            droneActions.forEach(async (action, index) => {
                let result = await this.runAction(action);
                if(result !== true) {
                    reject(`Error occured while running action: ${index} ${action}`);
                }
            });

            resolve(true);
        });
    }

    private async runAction(action: DroneAction): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            
        });
    }

    private takeOff(): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            this._client.takeoff(() => {
                resolve(this._client);
            });
        });
    }

    private land(): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            this._client.land(() => {
                resolve(this._client);
            });
        });
    }
}

const droneOperator = new DroneOperator();