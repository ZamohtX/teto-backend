import { CreateTaskDefinitionDto } from "../dto/create-task-definition.dto";
import { TaskDefinition, TaskInstance } from "@prisma/client";
import { TaskStatus } from "../enums/task-status.enum";

export abstract class TasksRepository {
    
    abstract createDefinition(data: CreateTaskDefinitionDto): Promise<TaskDefinition>;

    abstract createInstance(taskDefId: string, dueDate: Date): Promise<void>;

    abstract findInstancesByHouseId(houseId: string, status?: TaskStatus): Promise<TaskInstance[]>;

    abstract findAllDefinitions(): Promise<TaskDefinition[]>;

    abstract findLastInstance(taskDefId: string): Promise<TaskInstance | null>;

    abstract hasPendingInstance(taskDefId: string): Promise<boolean>;
}