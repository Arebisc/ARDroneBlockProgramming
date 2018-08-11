import * as express from 'express';
import * as bodyParser from 'body-parser';
import { exec } from 'child_process';
import { DroneOperator } from './droneOperator';
import { DroneAction } from './classes/droneAction';


export class HttpService {
    private readonly port: number;
    private readonly app: express.Application;
    private droneOperator: DroneOperator;

    public constructor(port: number | null = 3000) {
        this.port = port;
        this.app = express();
        this.droneOperator = new DroneOperator();
        this.initDroneOperator();
    }

    // TODO init events
    private initDroneOperator() {

    }

    public startListening() :void {
        this.app.use(bodyParser.json());
        
        this.app.listen(this.port, () => {
            this.app.route('/').post(async (request: express.Request, response: express.Response) => {
                console.log('request');
                let result = await this.handleRequest(request);
                response.send(result);
            });
        })

        console.log('Started server');
    }

    private async handleRequest(request: express.Request): Promise<boolean> {
        const actions = request.body as DroneAction[];

        let result = await this.droneOperator.runActions(actions);

        return result;
    }
}