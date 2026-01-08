import { Injectable, Logger } from "@nestjs/common";
import { CreateTaskDefinitionDto } from "./dto/create-task-definition.dto";
import { TasksRepository } from "./repositories/tasks.repository";
import { TaskFrequency } from "./enums/task-frequency.enum";
import { TaskDefinition } from "./entities/task-definition.entity";
import { TaskStatus } from "./enums/task-status.enum";


@Injectable()
export class TasksService {
    
    private readonly logger = new Logger(TasksService.name);

    constructor(private readonly tasksRepository: TasksRepository){}

    async createDefinition(createDto: CreateTaskDefinitionDto, userId: string){
        const taskDef = await this.tasksRepository.createDefinition(createDto);

        if (createDto.frequency === TaskFrequency.ONE_TIME){
            const dueDate = new Date(taskDef.startDate);
            await this.tasksRepository.createInstance(taskDef.id, dueDate);
        }

        return {
            message: 'Definição criada com sucesso!',
            taskDefinition: taskDef,
            generateInstance: createDto.frequency === TaskFrequency.ONE_TIME
        }
    };


    async findAllInstances(houseId: string, status?: TaskStatus){
        return this.tasksRepository.findInstancesByHouseId(houseId, status);
    }



    async processRecurringTasks() {
        this.logger.log('--- Iniciando Ciclo de Agendamento ---');

        const definitions = await this.tasksRepository.findAllDefinitions();
        const now = new Date();
        now.setHours(0,0,0,0);

        for (const def of definitions) {
            if (def.frequency === 'ONE_TIME' || def.frequency === 'EMERGENCY') continue;

            const hasPending = await this.tasksRepository.hasPendingInstance(def.id);
            if (hasPending) continue;

            const lastInstance = await this.tasksRepository.findLastInstance(def.id);
            let baseDate = lastInstance ? new Date(lastInstance.dueDate) : new Date(def.startDate);
            baseDate.setHours(0,0,0,0);

            // Calculadora
            const nextDueDate = this.calculateNextDueDate(baseDate, def);

            if (!nextDueDate) continue;

            // se chegou a hora ou passou, cria
            if (nextDueDate <= now) {
                // Evita duplicar hoje se a ultima ja foi hoje
                if (lastInstance && new Date(lastInstance.dueDate).setHours(0,0,0,0) === now.getTime()){
                    continue;
                }
                this.logger.log(`Agendando: ${def.title} para ${nextDueDate.toISOString().split('T')[0]}`);
                await this.tasksRepository.createInstance(def.id, nextDueDate);
            }
        }
        this.logger.log('--- Ciclo Finalizado ---');
    }


    private calculateNextDueDate(lastDate: Date, def: TaskDefinition): Date | null {
        const frequency = def.frequency as unknown as TaskFrequency;
        const interval = def.interval;
        const selectedDays = def.selectedDays;

        let candidateDate = new Date(lastDate);

        // Logica Simples
        if (frequency === TaskFrequency.DAILY){
            candidateDate.setDate(candidateDate.getDate() + interval);
            return candidateDate;
        }
        if (frequency === TaskFrequency.MONTHLY){
            candidateDate.setMonth(candidateDate.getMonth() + interval);
            return candidateDate;
        }
        if (frequency === TaskFrequency.YEARLY){
            candidateDate.setDate(candidateDate.getFullYear() + interval);
            return candidateDate;
        }

        // Logica Complexa (Semanal)
        if (frequency === TaskFrequency.WEEKLY){
            candidateDate.setDate(candidateDate.getDate() + 1); // começa a buscar a partir de amanha

            for (let i = 0; i < 365; i++){
                const currentDayOfWeek = candidateDate.getDay();
                // Dia da semana Bate?
                const isCorrectDay = selectedDays.length === 0 || selectedDays.includes(currentDayOfWeek);

                if (isCorrectDay) {
                    // Intervalo de semanas bate?
                    const start = new Date(def.startDate);
                    start.setHours(0,0,0,0);
                
                    const diffTime = candidateDate.getDate() - start.getDate();
                    const diffDays = Math.ceil(diffTime / ( 1000 * 60 * 60 * 24));
                    const diffWeeks = Math.floor(diffDays / 7);

                    if (diffWeeks % interval === 0){
                        return candidateDate;
                    }
                }
                candidateDate.setDate(candidateDate.getDate() + 1);
            }
        }
        return null;    
    }
}