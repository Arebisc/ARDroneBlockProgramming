import { DroneAction } from './classes/droneAction';
import * as arDrone from 'ar-drone';
import { ActionType } from './Types/ActionType';
import { ComputerVision } from './computerVision';
import { DroneNavData } from './interfaces/droneOperator';


export class DroneOperator {
    private _client: arDrone.Client;
    private _pngStream: arDrone.PngStream;
    private _computerVision: ComputerVision;

    public constructor(droneIp: string = "192.168.1.1") {
        this._client = arDrone.createClient({
            ip: droneIp,
        });

        this._pngStream = this._client.getPngStream();
        this._computerVision = new ComputerVision("url here", "key here");
    }

    public getNavdata(): Promise<DroneNavData> {
        return new Promise((resolve, reject) => {
            this._client.once('navdata', console.log);
            this._client.once('navdata', (data) => {
                resolve(data);
            });
        });
    }
    
    public async runActions(droneActions: DroneAction[]): Promise<boolean> {
        console.log('runActions');
        await this.takeOff();
        await this.stop();

        return new Promise<boolean>(async (resolve, reject) => {
            console.log('droneActions: ' + droneActions.length);
            
            for (let i: number = 0; i < droneActions.length; i++ ) {
                await this.runAction(droneActions[i]);
                await this.stop();
            }
            console.log('outside actions foreach');
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

            case ActionType.TurnLeftTillRecognize:
                await this.turningLeftTillRecognizedObject(action);
                console.log('awaited turnLeftTillRecognize');
            break;

            case ActionType.TurnRightTillRecognize:
                await this.turningRightTillRecognizedObject(action);
                console.log('awaited turnLeftTillRecognize');
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
            });
            setTimeout(resolve(this._client), delay);
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

    private async wait(timeInMiliseconds: number) : Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            console.log('wait');
            setTimeout(() => {
                console.log('waited');
                resolve(this._client);
            }, timeInMiliseconds);
        });
    }

    private async turningLeftTillRecognizedObject(droneAction: DroneAction) :Promise<arDrone.Client> {
        return new Promise<arDrone.Client>(async (resolve, reject) => {
            let tagsInDroneRange = await this.getTagsInDroneRange();
            let anyTagRecognized = this.tagRecognized(droneAction.tag, tagsInDroneRange);

            while(!anyTagRecognized) {
                await this.turnLeft(droneAction);
                await this.stop();
                await this.wait(1000);

                tagsInDroneRange = await this.getTagsInDroneRange();
                anyTagRecognized = this.tagRecognized(droneAction.tag, tagsInDroneRange)
            }

            resolve(this._client);
        });
    }

    private async turningRightTillRecognizedObject(droneAction: DroneAction) :Promise<arDrone.Client> {
        return new Promise<arDrone.Client>(async (resolve, reject) => {
            let tagsInDroneRange = await this.getTagsInDroneRange();
            let anyTagRecognized = this.tagRecognized(droneAction.tag, tagsInDroneRange);

            while(!anyTagRecognized) {
                await this.turnRight(droneAction);
                await this.stop();
                await this.wait(1000);

                tagsInDroneRange = await this.getTagsInDroneRange();
                anyTagRecognized = this.tagRecognized(droneAction.tag, tagsInDroneRange)
            }

            resolve(this._client);
        });
    }

    public async getTagsInDroneRange() {
        let photoReceived = await this.takePhoto();
        let tagsReceived = await this._computerVision.getImageTags(photoReceived, 0.0);

        return tagsReceived;
    }

    private tagRecognized(tagToRecognize: string, tagsReceived: string[]): boolean {
        console.log(tagsReceived);
        if(tagsReceived.includes(tagToRecognize)){
            console.log('Recognized: ', tagToRecognize);
            return true;
        }
        
        return false;
    }

    public async takePhoto() :Promise<object> {
        return new Promise<object>((resolve, reject) => {
            this._pngStream.once('data', function (data) {
                resolve(data);
            });
        });
    }
    
    public configurePngStream(callback: Function, errorCallback: Function): void {
        this._pngStream.on('data', callback);
        this._pngStream.on('error', errorCallback);
    }
}