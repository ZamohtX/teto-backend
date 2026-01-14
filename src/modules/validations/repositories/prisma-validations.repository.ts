import { Injectable } from "@nestjs/common";
import { ValidationsRepository } from "./validations.repository";
import { PrismaService } from "src/database/prisma.service";
import { CreateValidationDto } from "../dto/create-validation.dto";
import { Validation } from "../entities/validation.entity";
import { ValidationMapper } from "../mappers/validation.mapper";


@Injectable()
export class PrismaValidationsRepository implements ValidationsRepository {
    
    constructor(private readonly prisma: PrismaService){}

    async create(data: CreateValidationDto, validatorId: string): Promise<Validation> {
        const raw = await this.prisma.validation.create({
            data: {
                approved: data.approved,
                comment: data.comment,
                taskInstanceId: data.taskInstanceId,
                validatorId: validatorId,
            }
        });
        return ValidationMapper.toDomain(raw);
    }

    async findByTaskInstanceId(taskInstanceId: string): Promise<Validation[]> {
        const rawList = await this.prisma.validation.findMany({
            where: { taskInstanceId },
            orderBy: { createdAt: 'desc'}
        });
        return rawList.map(item => ValidationMapper.toDomain(item));
    }


}