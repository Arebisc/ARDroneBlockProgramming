import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { MessagePackHubProtocol } from '@aspnet/signalr-protocol-msgpack';
import { DroneOperator } from './droneOperator';
import { DroneAction } from './classes/droneAction';

(<any>global).XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
(<any>global).WebSocket = require("websocket").w3cwebsocket;


export class SignalRService {
    private _connection: HubConnection;
    private _droneOperator: DroneOperator;

    public constructor() {
        this._droneOperator = new DroneOperator();
    }

    public async initSignalR() {
        this._connection = new HubConnectionBuilder()
            .withUrl("http://localhost:5026/droneHub")
            .withHubProtocol(new MessagePackHubProtocol())
            .build();

        try {
            await this._connection.start()

            this.initConnections();
            this.initVideoStream();

            console.log('Connection started');
        }
        catch(error) {
            console.error(error);
        }
    }

    public async initConnections() {
        this._connection.on('PerformActions', async (data: DroneAction[]) => {
            console.log('PerformActions');
            console.log(data);

            await this._droneOperator.runActions(data);
            console.log('finished on drone');
            this._connection.invoke('DroneFinishedPerformingActions');
        });
    }

    public async initDroneTagsRecognizingInterval() {
        setInterval(async () => {
            let tags = await this._droneOperator.getTagsInDroneRange();
            this._connection.invoke('TagsRecognizedByDrone', tags);
        }, 2000);
    }

    private initVideoStream() {
        this._droneOperator.configurePngStream(async (data) => {
            await this._connection.invoke('PngBufferFromDrone', data);
        }, (error) => {
            console.log(error);
        });
    }
}