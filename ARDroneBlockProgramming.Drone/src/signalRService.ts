import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
(<any>global).XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
(<any>global).WebSocket = require("websocket").w3cwebsocket;


export class SignalRService {
    private _connection: HubConnection;

    public async initSignalR() {
        this._connection = new HubConnectionBuilder()
            .withUrl("http://localhost:5026/droneHub")
            .build();

        try {
            this._connection.start().then(() => {
                this._connection.on('PerformActions', (data) => {
                    console.log('PerformActions');
                    console.log(data);
                });
            });
            console.log('Connection started');
        }
        catch(error) {
            console.error(error);
        }
    }
}