import { Injectable } from "@nestjs/common";
import { TasksRepository } from "./tasks.repository";
import { PrismaService } from "src/database/prisma.service";
import { CreateTaskDefinitionDto } from "../dto/create-task-definition.dto";
// Tipos do Prisma (apenas para uso interno aqui)
import { TaskFrequency as PrismaTaskFrequency, TaskStatus as PrismaTaskStatus } from "@prisma/client";
// Tipos do Domínio
import { TaskDefinition } from "../entities/task-definition.entity";
import { TaskInstance } from "../entities/task-instance.entity";
import { TaskStatus } from "../enums/task-status.enum";
import { TaskMapper } from "../mappers/task.mapper";

@Injectable()
export class PrismaTasksRepository implements TasksRepository {

    constructor(private readonly prisma: PrismaService){}

    async createDefinition(data: CreateTaskDefinitionDto): Promise<TaskDefinition> {
        const raw = await this.prisma.taskDefinition.create({
            data: {
                title: data.title,
                description: data.description,
                weight: data.weight,
                frequency: data.frequency as unknown as PrismaTaskFrequency,
                interval: data.interval || 1,
                selectedDays: data.selectedDays || [],
                startDate: data.startDate ? new Date(data.startDate) : new Date(),
                repeatCount: data.repeatCount || 1,
                houseId: data.houseId
            }
        });

        // CONVERSÃO AQUI
        return TaskMapper.toDomainDefinition(raw);
    }

    async createInstance(taskDefId: string, dueDate: Date): Promise<void> {
        // Void não precisa de mapper
        await this.prisma.taskInstance.create({
            data: {
                taskDefId: taskDefId,
                dueDate: dueDate,
                status: PrismaTaskStatus.PENDING,
            }
        })
    }

    async findAllDefinitions(): Promise<TaskDefinition[]> {
        const rawList = await this.prisma.taskDefinition.findMany();
        // Mapeia a lista inteira
        return rawList.map(raw => TaskMapper.toDomainDefinition(raw));
    }

    async findLastInstance(taskDefId: string): Promise<TaskInstance | null> {
        const raw = await this.prisma.taskInstance.findFirst({
            where: { taskDefId },
            orderBy: { dueDate: 'desc' },
        });

        if (!raw) return null;
        return TaskMapper.toDomainInstance(raw as any);
    }

    async hasPendingInstance(taskDefId: string): Promise<boolean> {
        const count = await this.prisma.taskInstance.count({
            where: {
                taskDefId: taskDefId,
                status: {
                    in: [PrismaTaskStatus.PENDING, PrismaTaskStatus.IN_PROGRESS, PrismaTaskStatus.IN_REVIEW]
                }
            }
        });
        return count > 0;
    }

    async findInstancesByHouseId(houseId: string, status?: TaskStatus): Promise<TaskInstance[]> {
        const rawList = await this.prisma.taskInstance.findMany({
            where: {
                taskDef: { houseId: houseId },
                ...(status ? { status: status as unknown as PrismaTaskStatus } : {})
            },
            include: {
                taskDef: true, // Inclui a definição para mapearmos o título
                assignedTo: true 
            },
            orderBy: { dueDate: 'asc' }
        });

        return rawList.map(raw => TaskMapper.toDomainInstance(raw));
    }
}