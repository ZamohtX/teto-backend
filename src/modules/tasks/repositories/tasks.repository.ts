import { CreateTaskDefinitionDto } from "../dto/create-task-definition.dto";
import { TaskStatus } from "../enums/task-status.enum";
import { TaskDefinition } from "../entities/task-definition.entity";
import { TaskInstance } from "../entities/task-instance.entity";

export abstract class TasksRepository {
    
    abstract createDefinition(data: CreateTaskDefinitionDto): Promise<TaskDefinition>;

    abstract createInstance(taskDefId: string, dueDate: Date): Promise<void>;

    abstract findInstancesByHouseId(houseId: string, status?: TaskStatus): Promise<TaskInstance[]>;

    abstract findAllDefinitions(): Promise<TaskDefinition[]>;

    abstract findLastInstance(taskDefId: string): Promise<TaskInstance | null>;

    abstract hasPendingInstance(taskDefId: string): Promise<boolean>;
}