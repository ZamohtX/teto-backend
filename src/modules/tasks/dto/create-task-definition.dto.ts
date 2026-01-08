import { IsNotEmpty, IsString, IsInt, IsEnum, Min, IsOptional, IsUUID, IsArray, Max, IsISO8601, } from "class-validator";
import { TaskFrequency } from "../enums/task-frequency.enum";

export class CreateTaskDefinitionDto {
    @IsString({message: 'O ID da casa deve ser um texto.'})
    @IsUUID(undefined, {message: 'ID da casa inválido.'})
    @IsNotEmpty({message: 'é obrigatorio informar a qual casa a tarefa pertence.'})
    houseId: string;

    @IsString({message: 'O título deve ser um texto.'})
    @IsNotEmpty({message: 'O título é obrigatório.'})
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsInt({message: 'O peso deve ser um número inteiro.'})
    @Min(1, {message: 'A tarefa deve valer pelo menos 1 ponto.'})
    weight: number;

    @IsEnum(TaskFrequency, {message: 'A frequência deve estar entre as opções disponiveis'})
    frequency: TaskFrequency;

    @IsInt({message: 'O intervalo deve ser um número inteiro'})
    @Min(1, {message: 'O intervalor deve ser de pelo menos 1'})
    @IsOptional()
    interval?: number;
    
    @IsArray()
    @IsInt({each: true})
    @Min(0, {each: true})
    @Max(6, {each: true})
    @IsOptional()
    selectedDays?: number[]

    @IsISO8601()
    @IsOptional()
    startDate?: string;

    @IsInt()
    @IsOptional()
    repeatCount?: number;
}