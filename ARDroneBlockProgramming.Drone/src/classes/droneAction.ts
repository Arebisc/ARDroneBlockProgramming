import { ActionType } from '../Types/ActionType';

export class DroneAction {
    public actionLabel: string;
    public actionType: ActionType;
    public speed: number | null;
    public duration: number | null;
    public tag: string | null;

    public constructor(
        actionLabel: string,
        actionType: ActionType,
        speed: number | null = null,
        duration: number | null = null,
        tag: string | null = null
    ) {
        this.actionLabel = actionLabel;
        this.actionType = actionType;
        this.speed = 0.1;
        this.duration = 1000;
        this.tag = tag;

        if(speed != null){
            this.speed = speed;
        }
        if(duration != null){
            this.duration = duration;
        }
    }
}