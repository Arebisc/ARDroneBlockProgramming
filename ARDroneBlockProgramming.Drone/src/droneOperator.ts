import { DroneAction } from './classes/droneAction';
import * as arDrone from 'ar-drone';
import { ActionType } from './Types/ActionType';


export class DroneOperator {
    private _client: arDrone.Client;

    public constructor(droneIp: string = "192.168.1.1") {
        this._client = arDrone.createClient({
            ip: droneIp
        });
    }

    public async runActions(droneActions: DroneAction[]): Promise<boolean> {
        console.log('runActions');
        await this.takeOff();

        return new Promise<boolean>(async (resolve, reject) => {
            console.log('droneActions: ' + droneActions.length);

            // droneActions.forEach(async (action, index) => {
            //     console.log(action);
            //     await this.runAction(action);
            // });
            for (let i: number = 0; i < droneActions.length; i++ ) {
                await this.runAction(droneActions[i]);
            }
            console.log('outside foreach')

            await this.land();
            resolve(true);
        });
    }

    private async runAction(action: DroneAction) {
        console.log('inside run action');
        
        switch(action.actionType) {
            case ActionType.Forward:
                await this.forward(action);
                console.log('awaited action');
            break;
            
            case ActionType.Back:
                await this.back(action);
                console.log('awaited action');
            break;
        }

        return true;
    }

    private async forward(action: DroneAction): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            this._client.after(action.duration, () => {
                console.log('forward');
                this._client.front(action.speed);
                resolve(this._client);
            });
        })
    }

    private async back(action: DroneAction): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            this._client.after(action.duration, () => {
                console.log('back');
                this._client.back(action.speed);
                resolve(this._client);
            });
        })
    }

    private async stop() : Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            this._client.after(0, () => {
                console.log('stop');
                this._client.stop();
                resolve(this._client);
            });
        })
    }

    private async takeOff(delay: number = 5000): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            this._client.takeoff(() => {
                console.log('takeoff');
                setTimeout(() => {
                    resolve(this._client);
                }, delay);
            });
        });
    }

    private async land(): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            this._client.land(() => {
                console.log('land');
                resolve(this._client);
            });
        });
    }
}

const droneOperator = new DroneOperator();

const actions = new Array<DroneAction>();
actions.push(new DroneAction("Forward", ActionType.Forward, 0.1, 4000));
actions.push(new DroneAction("Back", ActionType.Back, 0.1, 3000));
droneOperator.runActions(actions);