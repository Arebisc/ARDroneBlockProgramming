import { Rabbit } from 'rabbit-queue';


export class RabbitConnection {
    private rabbit: Rabbit;

    public constructor() {
        this.rabbit = this.configureRabbit();
    }

    private configureRabbit() {
        const rabbit = new Rabbit(process.env.RABBIT_URL || 'amqp://localhost', {
            prefetch: 1,
            replyPattern: true,
            scheduledPublish: false,
            prefix: '',
            socketOptions: {}     
        });

        rabbit.on('connected', () => {
            console.log('Client: rabbit connected');
        });

        rabbit.on('disconnected', (err = new Error('Rabbitmq Disconnected')) => {
            console.error(err);
            setTimeout(() => rabbit.reconnect(), 100);
        });

        return rabbit;
    }
}