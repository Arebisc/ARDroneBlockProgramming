import { SignalRService } from './signalRService';

export class Main {
    private readonly signalRService: SignalRService;

    public constructor() {
        console.log('Application starting');
        this.signalRService = new SignalRService();
        console.log('Application started');
    }
}

const main = new Main();