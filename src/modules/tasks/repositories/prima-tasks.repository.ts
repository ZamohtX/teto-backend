import { Injectable } from "@nestjs/common";
import { TasksRepository } from "./tasks.repository";
import { PrismaService } from "src/database/prisma.service";
import { CreateTaskDefinitionDto } from "../dto/create-task-definition.dto";
import { TaskDefinition, TaskInstance, TaskFrequency as PrismaTaskFrequency, TaskStatus as PrismaTaskStatus } from "@prisma/client";
import { TaskStatus } from "../enums/task-status.enum";


@Injectable()
export class PrismaTaskRepository implements TasksRepository {
    constructor(private readonly prisma: PrismaService){}

    async createDefinition(data: CreateTaskDefinitionDto): Promise<TaskDefinition> {
        return await this.prisma.taskDefinition.create({
            data: {
                title: data.title,
                description: data.description,
                weight: data.weight,
                frequency: data.frequency as unknown as PrismaTaskFrequency,

                interval: data.interval || 1,
                selectedDays: data.selectedDays || [],

                startDate: data.startDate ? new Date(data.startDate) : new Date(),
                
                repeatCount: data.repeatCount || 1,
                houseId: data.houseId,
            }
        })
    }


    async createInstance(taskDefId: string, dueDate: Date): Promise<void> {
        await this.prisma.taskInstance.create({
            data: {
                taskDefId: taskDefId,
                dueDate: dueDate,
                status: TaskStatus.PENDING,
            }
        })
    }

    async findInstancesByHouseId(houseId: string, status?: TaskStatus): Promise<TaskInstance[]> {
        return await this.prisma.taskInstance.findMany({
            where: {
                // Filtra pela casa
                taskDef: {
                    houseId: houseId,
                },
                // Filtra pelo status (caso ele seja fornecido)
                // Sintaxe do spread condicional do JS

                ...(status ? {status : status as unknown as PrismaTaskStatus} : {})
            },
            include: {
                taskDef: true, // Traz os dados da definição
                assignedTo: true, // Traz os dados do usuário
            },
            orderBy: {
                dueDate: 'asc',
            }
        });
    }

    
    async findAllDefinitions(): Promise<TaskDefinition[]> {
        return await this.prisma.taskDefinition.findMany();
    }


    async findLastInstance(taskDefId: string): Promise<TaskInstance | null> {
        return await this.prisma.taskInstance.findFirst({
            where: {taskDefId},
            orderBy: {dueDate: 'desc'}, 
        });
    }


    async hasPendingInstance(taskDefId: string): Promise<boolean> {
        const count = await this.prisma.taskInstance.count({
            where: {
                taskDefId: taskDefId,
                status: {
                    in: [TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.IN_REVIEW]
                }
            }
        });
        return count > 0;
    }
}