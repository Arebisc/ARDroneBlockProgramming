import { RabbitConnection } from './rabbitConnection';
import { getMaxListeners } from 'cluster';


export class Main {
    public Start() {
        let rabbit = new RabbitConnection();
    }
}

const main = new Main();
main.Start();