import { ActionEnum } from './ActionEnum';


export class DroneAction {
    public actionLabel: string;
    public actionEnum: ActionEnum;
    public speed: number | null;
    public duration: number | null;

    public constructor(actionLabel: string, actionEnum: ActionEnum) {
        this.actionLabel = actionLabel;
        this.actionEnum = actionEnum;
        this.speed = null;
        this.duration = null;
    }
}