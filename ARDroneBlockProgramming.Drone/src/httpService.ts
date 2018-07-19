import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';


export class HttpService {
    private readonly port: number;
    private readonly app: express.Application;

    public constructor(port: number | null = 3000) {
        this.port = port;
        this.app = express();
    }

    public startListening() :void {
        this.app.use(bodyParser.json());
        
        this.app.listen(this.port, () => {
            this.app.route('/').post((request: Request) => {
                console.log('request');
                let response = this.handleRequest(request);
            })
        })

        console.log('Started server');
    }

    private handleRequest(request: Request): string {
        return 'OK';
    }
}