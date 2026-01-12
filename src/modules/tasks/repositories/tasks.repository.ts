import { CreateTaskDefinitionDto } from "../dto/create-task-definition.dto";
import { TaskStatus } from "../enums/task-status.enum";
import { TaskDefinition } from "../entities/task-definition.entity";
import { TaskInstance } from "../entities/task-instance.entity";
import { UpdateTaskDefinitionDto } from "../dto/update-task-definition.dto";
import { UpdateTaskInstanceDto } from "../dto/update-task-instance.dto";

export abstract class TasksRepository {
    // Cria Definição da Task
    abstract createDefinition(data: CreateTaskDefinitionDto): Promise<TaskDefinition>;

    // Cria as Instancias da Task
    abstract createInstance(taskDefId: string, dueDate: Date): Promise<void>;

    // Busca as Instancias de uma casa
    abstract findInstancesByHouseId(houseId: string, status?: TaskStatus): Promise<TaskInstance[]>;
   
    // Busca todas as Definições das Tasks da Casa
    abstract findAllDefinitions(): Promise<TaskDefinition[]>;
   
    // Busca a ultima Instancia de uma Definição
    abstract findLastInstance(taskDefId: string): Promise<TaskInstance | null>;
   
    // Checa se a Instancia de uma Definição está Pendente
    abstract hasPendingInstance(taskDefId: string): Promise<boolean>;
   
    // Busca Definição de uma Task pelo ID
    abstract findDefinitionById(id: string): Promise<TaskDefinition | null>;
   
    // Busca uma Instância de uma Definição pelo ID
    abstract findInstanceById(id: string): Promise<TaskInstance | null>;
   
    // Atualiza a Definição de uma Task
    abstract updateDefinition(id: string, data: UpdateTaskDefinitionDto): Promise<TaskDefinition>;
   
    // Atualiza a Instância de uma Definição
    abstract updateInstance(id: string, data: UpdateTaskInstanceDto): Promise<TaskInstance>;
   
    // Deleta a Task
    abstract deleteDefinition(id: string): Promise<void>;
}