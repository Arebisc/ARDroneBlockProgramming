import { HubConnection } from '@aspnet/signalr';
import { DroneAction } from './classes/droneAction';
import * as arDrone from 'ar-drone';
import { ActionType } from './Types/ActionType';
import { ComputerVision } from './computerVision';
import { DroneNavData, DroneEstimatedPosition } from './interfaces/droneOperator';


export class DroneOperator {
    private _client: arDrone.Client;
    private _pngStream: arDrone.PngStream;
    private _computerVision: ComputerVision;
    private _udpControl: arDrone.UdpControl;

    private EMERGENCY_BIT_POSITION: number = 8;
    
    private droneStopped: boolean = false;
    private forcedLanding: boolean = false;

    private restrictedMode: boolean = false;
    private restrictedAreaInMeters: number = 0;

    private _lastNavdata: DroneNavData = null;

    private readonly M_PI = 3.14159265358979323846;
    private _dronePosition: DroneEstimatedPosition;

    private initRestrictedModeWatchdog() {
        setInterval(() => {
            if(!this.restrictedMode || !this._dronePosition) {
                return;
            }

            if(this._dronePosition.x >= this.restrictedAreaInMeters ||
                this._dronePosition.y >= this.restrictedAreaInMeters ||
                this._dronePosition.z >= this.restrictedAreaInMeters)
            {
                this.droneStopped = true;
            }
        }, 200);
    }

    public constructor(
        private _hubConnection: HubConnection,
        droneIp: string = "192.168.1.1") 
        {
        this._client = arDrone.createClient({
            ip: droneIp,
        });

        this._pngStream = this._client.getPngStream();

        this._client.config('general:navdata_demo', 'FALSE', () => {
            console.log('general:navdata_demo callback');
        });

        this._udpControl = arDrone.createUdpControl();
        this._computerVision = new ComputerVision("url here", "key here");

        this.initNavdataHandler();
        this.initRestrictedModeWatchdog();
    }

    public getNavdata():Promise<DroneNavData> {
        return new Promise((resolve, reject) => {
            // this._client.once('navdata', console.log);
            this._client.once('navdata', (data) => {
                resolve(data);
            });
        });
    }

    private initNavdataHandler() {
        this._client.on('navdata', (navdata: DroneNavData) => {
            this._dronePosition = this.calculatePosition(navdata);
            this._lastNavdata = navdata;
        });
    }
    
    public async runActions(droneActions: DroneAction[]): Promise<boolean> {
        console.log('runActions');
        await this.takeOff();
        await this.stop();

        console.log('droneActions: ' + droneActions.length);
        
        for (let i: number = 0; i < droneActions.length; i++ ) {

            if(this.forcedLanding) {
                this.forcedLanding = false;
                console.log('Loop breaked before run action');
                break;
            }

            var result = await this.runAction(droneActions[i]);
            
            if(result !== true ) {
                return false;
            }

            if(this.forcedLanding) {
                this.forcedLanding = false;
                console.log('Loop breaked after run action');
                break;
            }

            await this.stop();
        }
        console.log('outside actions foreach');
        await this.land();

        return true;
    }

    private async runAction(action: DroneAction): Promise<boolean> {
        console.log('inside run action');

        if(this.isDroneStopped()) {
            return false;
        }

        this.actionCompletedAlert();
        
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

    private async stop(): Promise<arDrone.Client> {
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
            setTimeout(() => resolve(this._client), delay);
        });
    }

    private async land(delay: number = 3000): Promise<arDrone.Client> {
        return new Promise<arDrone.Client>((resolve, reject) => {
            console.log('land');
            this._client.land(() => {
                console.log('after land');
            });
            setTimeout(() => {
                this.forcedLanding = false;
                this.droneStopped = false;
                resolve(this._client);
            }, delay);
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
        if(!droneAction.tag) {
            console.log('No tag provided. Skipping action.');
            return this._client;
        }

        let tagsInDroneRange = await this.getTagsInDroneRange();
        let anyTagRecognized = this.tagRecognized(droneAction.tag, tagsInDroneRange);

        while(!anyTagRecognized) {

            if(this.forcedLanding) {
                return this._client;
            }

            await this.turnLeft(droneAction);
            await this.stop();
            await this.wait(1000);

            tagsInDroneRange = await this.getTagsInDroneRange();
            anyTagRecognized = this.tagRecognized(droneAction.tag, tagsInDroneRange)
        }

        return this._client;
    }

    private async turningRightTillRecognizedObject(droneAction: DroneAction) :Promise<arDrone.Client> {
        let tagsInDroneRange = await this.getTagsInDroneRange();
        let anyTagRecognized = await this.tagRecognized(droneAction.tag, tagsInDroneRange);

        if(!droneAction.tag) {
            console.log('No tag provided. Skipping action.');
            return this._client;
        }

        while(!anyTagRecognized) {
            if(this.forcedLanding) {
                return this._client;
            }

            await this.turnRight(droneAction);
            await this.stop();
            await this.wait(1000);

            tagsInDroneRange = await this.getTagsInDroneRange();
            anyTagRecognized = await this.tagRecognized(droneAction.tag, tagsInDroneRange)
        }

        return this._client;
    }

    public async getTagsInDroneRange() {
        let photoReceived = await this.takePhoto();
        let tagsReceived = await this._computerVision.getImageTags(photoReceived, 0.0);

        return tagsReceived;
    }

    private async tagRecognized(tagToRecognize: string, tagsReceived: string[]): Promise<boolean> {
        console.log(tagsReceived);
        if(tagsReceived.includes(tagToRecognize)){
            console.log('Recognized: ', tagToRecognize);
            await this.recognizedObjectAlert(tagToRecognize);
            return true;
        }
        
        return false;
    }

    public disableDroneMotors() {
        console.log('Disable drone motors');
        this._udpControl.raw("REF", (1 << this.EMERGENCY_BIT_POSITION));
        this._udpControl.flush();

        this.droneStopped = true;
    }

    public emergencyStopReset() {
        console.log('Emergency stop reset');
        this._udpControl.raw("REF", (0 << this.EMERGENCY_BIT_POSITION));
        this._udpControl.flush();

        this.droneStopped = false;
    }

    public async takePhoto(): Promise<object> {
        return new Promise<object>((resolve, reject) => {
            this._pngStream.once('data', function (data) {
                resolve(data);
            });
        });
    }

    private async recognizedObjectAlert(objectName: string) {
        await this._hubConnection.invoke('DroneRecognizedObjectFromAction', objectName);
    }

    private async actionCompletedAlert() {
        await this._hubConnection.invoke('DroneFinishedOneAction');
    }

    private isDroneStopped(): boolean {
        return this.droneStopped == true;
    }

    public async forceLand(): Promise<void> {
        await this.stop();
        this.forcedLanding = true;
    }

    public resetForcedLand() {
        this.forcedLanding = false;
    }

    public resetDroneStopped() {
        this.droneStopped = false;
    }

    public setRestrictedAreaInMeters(restrictions: number) {
        this.restrictedAreaInMeters = restrictions;
    }

    public getRestrictionsMeters() {
        return this.restrictedAreaInMeters;
    }

    public getLastNavdata() {
        return this._lastNavdata;
    }

    private calculatePosition(droneNavdata: DroneNavData): DroneEstimatedPosition {
        if(!this._lastNavdata) {
            return;
        }

        if(!droneNavdata.references || !droneNavdata.demo) {
            return;
        }

        const deltaT = (this._lastNavdata.time - this.getLastNavdata().time);

        let positionX = ((Math.cos((droneNavdata.references.psi / 180000.0) * this.M_PI) *
            droneNavdata.demo.xVelocity - Math.sin((droneNavdata.references.psi / 180000.0) * this.M_PI) *
            -droneNavdata.demo.yVelocity) * deltaT) / 1000.0;

        let positionY = ((Math.sin((droneNavdata.references.psi / 180000.0) * this.M_PI) *
            droneNavdata.demo.xVelocity + Math.cos((droneNavdata.references.psi / 180000.0) * this.M_PI) *
            -droneNavdata.demo.yVelocity) * deltaT) / 1000.0;

        let positionZ = droneNavdata.demo.altitude / 1000.0;

        return {
            x: positionX,
            y: positionY,
            z: positionZ
        }
    }

    public getPosition() {
        return this._dronePosition;
    }
}