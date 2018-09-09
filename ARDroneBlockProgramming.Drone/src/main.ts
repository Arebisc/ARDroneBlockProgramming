import { SignalRService } from './signalRService';

export class Main {
    private readonly signalRService: SignalRService;

    public constructor() {
        console.log('Application starting');
        this.signalRService = new SignalRService();
        console.log('Application started');
    }

    public async initServices() {
        await this.signalRService.initSignalR();
        await this.signalRService.initDroneTagsRecognizingInterval();
    }
}
(async () => {
    const main = new Main();
    await main.initServices();
})();
