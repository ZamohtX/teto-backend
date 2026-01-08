import { TaskStatus } from "../enums/task-status.enum";
import { TaskDefinition } from "./task-definition.entity";

export class TaskInstance {
    id: string;
    dueDate: Date;
    completedAt?: Date;
    proofPhotoUrl?: Date;
    status: TaskStatus;

    taskDefId: string;
    taskDef?: TaskDefinition;

    assignedToId: string;
    //assignedTo?: User;


    constructor(partial: Partial<TaskInstance>) {
        Object.assign(this, partial);
    }
}