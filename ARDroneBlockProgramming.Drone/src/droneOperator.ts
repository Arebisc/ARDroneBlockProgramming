import { DroneAction } from './classes/droneAction';
import * as arDrone from 'ar-drone';
import { ActionType } from './Types/ActionType';


export class DroneOperator {
    private _client: arDrone.Client;

    public constructor(droneIp: string = "192.168.1.1") {
        this._client = arDrone.createClient({
            ip: droneIp
        });
        console.log(this._client);
    }

    public async runActions(droneActions: DroneAction[]): Promise<boolean> {
        console.log('runActions');
        this.reset();
        await this.takeOff();
        await this.stop();

        return new Promise<boolean>(async (resolve, reject) => {
            
            console.log('after takeoff');

            console.log('droneActions: ' + droneActions.length);

            for (let i: number = 0; i < droneActions.length; i++ ) {
                await this.runAction(droneActions[i]);
                await this.stop();
            }
            console.log('outside foreach');

            await this.land();
            await this.stop();

            this.reset();
            resolve(true);
        });
    }

    private reset(): void {
        console.log('reset');
        // this._client._udpNavdatasStream.destroy();
        // this._client._udpControl.close();
        this._client.disableEmergency();
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
            console.log('forward');
            this._client.front(action.speed);
            this._client.after(action.duration, () => {
                resolve(this._client);
            });
        });
    }

    private async left(action: DroneAction): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            console.log('left');
            this._client.left(action.speed);
            this._client.after(action.duration, () => {
                resolve(this._client);
            });
        });
    }

    private async right(action: DroneAction): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            console.log('right');
            this._client.right(action.speed);
            this._client.after(action.duration, () => {
                resolve(this._client);
            });
        });
    }

    private async up(action: DroneAction): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            console.log('up');
            this._client.up(action.speed);
            this._client.after(action.duration, () => {
                resolve(this._client);
            });
        });
    }

    private async down(action: DroneAction): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            console.log('down');
            this._client.down(action.speed);
            this._client.after(action.duration, () => {
                resolve(this._client);
            });
        });
    }

    private async back(action: DroneAction): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            console.log('back');
            this._client.back(action.speed);
            this._client.after(action.duration, () => {
                resolve(this._client);
            });
        });
    }

    private async turnRight(action: DroneAction): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            console.log('turnRight');
            this._client.clockwise(action.speed);
            this._client.after(action.duration, () => {
                resolve(this._client);
            });
        });
    }

    private async turnLeft(action: DroneAction): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            console.log('turnLeft');
            this._client.counterClockwise(action.speed);
            this._client.after(action.duration, () => {
                resolve(this._client);
            });
        });
    }

    private async stop() : Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            console.log('stop');
            this._client.stop();
            this._client.after(0, () => {
                resolve(this._client);
            });
        });
    }

    private async takeOff(delay: number = 3000): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            console.log('takeoff');
            this._client.takeoff(() => {
                console.log('aftertk');
                setTimeout(() => {
                    console.log('inside timeout');
                    resolve(this._client);
                }, delay);
            });
        });
    }

    private async land(): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            console.log('land');
            this._client.land(() => {
                resolve(this._client);
            });
        });
    }

    public async wait(timeInMiliseconds: number) : Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            console.log('wait');
            setTimeout(() => {
                console.log('waited');
                resolve(this._client);
            }, timeInMiliseconds);
        });
    }
}