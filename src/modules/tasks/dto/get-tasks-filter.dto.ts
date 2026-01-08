import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { TaskStatus } from "../enums/task-status.enum";

export class GetTasksFilterDto {
    @IsNotEmpty({message: 'O ID da casa é obrigatório.'})
    @IsUUID()
    houseId: string;

    @IsOptional()
    @IsEnum(TaskStatus, { message: 'Status invalido. Opções: PENDING, IN_PROGRESS, IN_REVIEW, COMPLETED, REJECTED, EXPIRED'})
    status?: TaskStatus;
}