import { HttpService } from './httpService';

export class Main {
    private readonly httpService: HttpService;

    public constructor() {
        this.httpService = new HttpService();
    }

    public Start(): void {
        console.log('Application starting');

        this.httpService.startListening();
    }
}

const main = new Main();
main.Start();