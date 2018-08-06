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
        console.log('after takeoff');

        return new Promise<boolean>(async (resolve, reject) => {
            console.log('droneActions: ' + droneActions.length);

            for (let i: number = 0; i < droneActions.length; i++ ) {
                await this.runAction(droneActions[i]);
                await this.stop();
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
                console.log('awaited forward');
            break;
            
            case ActionType.Back:
                await this.back(action);
                console.log('awaited back');
            break;

            case ActionType.Left:
                await this.left(action);
                console.log('awaited left');
            break;

            case ActionType.Right:
                await this.right(action);
                console.log('awaited right');
            break;

            case ActionType.Up:
                await this.up(action);
                console.log('awaited up');
            break;

            case ActionType.Down:
                await this.down(action);
                console.log('awaited down');
            break;

            case ActionType.Left:
                await this.turnLeft(action);
                console.log('awaited left');
            break;

            case ActionType.Right:
                await this.turnRight(action);
                console.log('awaited right');
            break;

            case ActionType.TurnLeft:
                await this.turnLeft(action);
                console.log('awaited turnLeft');
            break;

            case ActionType.TurnRight:
                await this.turnRight(action);
                console.log('awaited turnRight');
            break;
        }

        return true;
    }

    private async forward(action: DroneAction): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            this._client.front(action.speed);
            this._client.after(action.duration, () => {
                console.log('forward');
                resolve(this._client);
            });
        });
    }

    private async left(action: DroneAction): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            this._client.left(action.speed);
            this._client.after(action.duration, () => {
                console.log('left');
                resolve(this._client);
            });
        });
    }

    private async right(action: DroneAction): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            this._client.right(action.speed);
            this._client.after(action.duration, () => {
                console.log('right');
                resolve(this._client);
            });
        });
    }

    private async up(action: DroneAction): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            this._client.up(action.speed);
            this._client.after(action.duration, () => {
                console.log('up');
                resolve(this._client);
            });
        });
    }

    private async down(action: DroneAction): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            this._client.down(action.speed);
            this._client.after(action.duration, () => {
                console.log('down');
                resolve(this._client);
            });
        });
    }

    private async back(action: DroneAction): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            this._client.back(action.speed);
            this._client.after(action.duration, () => {
                console.log('back');
                resolve(this._client);
            });
        });
    }

    private async turnRight(action: DroneAction): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            this._client.clockwise(action.speed);
            this._client.after(action.duration, () => {
                console.log('turnRight');
                resolve(this._client);
            });
        });
    }

    private async turnLeft(action: DroneAction): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            this._client.counterClockwise(action.speed);
            this._client.after(action.duration, () => {
                console.log('turnLeft');
                resolve(this._client);
            });
        });
    }

    private async stop() : Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            this._client.stop();
            this._client.after(0, () => {
                console.log('stop');
                resolve(this._client);
            });
        });
    }

    private async takeOff(delay: number = 3000): Promise<arDrone.Client> {
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