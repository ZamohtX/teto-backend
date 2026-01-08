import { TaskFrequency } from "../enums/task-frequency.enum";

export class TaskDefinition {
    id: string;
    houseId: string;
    title: string;
    description: string;
    weight: number;

    frequency: TaskFrequency;
    
    interval: number;
    selectedDays: number[];
    startDate: Date;

    repeatCount: number;

    constructor(partial: Partial<TaskDefinition>){
        Object.assign(this, partial);
    }
}