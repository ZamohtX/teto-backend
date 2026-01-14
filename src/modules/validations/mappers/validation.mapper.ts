import { Validation as PrismaValidation } from "@prisma/client";
import { Validation } from "../entities/validation.entity";

export class ValidationMapper {
    static toDomain(raw: PrismaValidation): Validation {
        return new Validation({
            id: raw.id,
            approved: raw.approved,
            comment: raw.comment || undefined,
            taskInstanceId: raw.taskInstanceId,
            validatorId: raw.validatorId,
            createdAt: raw.createdAt,
        });
    }
}