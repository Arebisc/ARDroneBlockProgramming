import { ActionEnum } from './ActionEnum';


export class DroneAction {
    public actionLabel: string;
    public actionEnum: ActionEnum;

    public constructor(actionLabel: string, actionEnum: ActionEnum) {
        this.actionLabel = actionLabel;
        this.actionEnum = actionEnum;
    }
}