import { ActionType } from '../Types/ActionType';


export class DroneAction {
    public actionLabel: string;
    public actionType: ActionType;
    public speed: number | null;
    public duration: number | null;

    public constructor(
        actionLabel: string,
        actionType: ActionType,
        speed: number | null = null,
        duration: number | null = null
    ) {
        this.actionLabel = actionLabel;
        this.actionType = actionType;
        this.speed = speed;
        this.duration = duration;
    }
}