import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
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
            .build();

        try {
            await this._connection.start()

            this.initConnections();

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
        }, 10000);
    }
}