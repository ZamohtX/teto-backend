import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { ValidationsRepository } from "./repositories/validations.repository";
import { TasksService } from "../tasks/tasks.service";
import { CreateValidationDto } from "./dto/create-validation.dto";
import { TaskStatus } from "../tasks/enums/task-status.enum";


@Injectable()
export class ValidationsService {
    
    constructor (
        private readonly validationsRepository: ValidationsRepository,
        private readonly tasksService: TasksService,
    ) {}


    async create(createDto: CreateValidationDto, validatorId: string) {
        // Busca a tarefa para ver se ela existe e pegar detalhes
        const task = await this.tasksService.findOneInstance(createDto.taskInstanceId);

        // O Dono da tarefa não pode validar o proprio trabalho
        if (task.assignedToId === validatorId) {
            throw new ConflictException('Você não pode validar sua própria tarefa.');
        }

        // salvar voto de validação
        const validation = await this.validationsRepository.create(createDto, validatorId);

        // O voto decide o destino da tarefa
        if (createDto.approved){
            // se aprovou marca como completa
            await this.tasksService.updateInstance(task.id, {
                status: TaskStatus.COMPLETED,
                completedAt: new Date()
            });
        } else {
            await this.tasksService.updateInstance(task.id, {
                status: TaskStatus.IN_PROGRESS,
            });
        }

        return {
            message: createDto.approved ? 'Tarefa validada e concluida' : 'Tarefa rejeitada e devolvida', 
            validation,
        };

    }



}