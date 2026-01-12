import { IsEnum, IsOptional, IsString, IsDateString } from "class-validator";
import { TaskStatus } from "../enums/task-status.enum";

export class UpdateTaskInstanceDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    assignedToId?: string;

    @IsOptional()
    @IsDateString()
    completedAt?: Date;
}