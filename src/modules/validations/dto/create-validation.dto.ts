import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateValidationDto {
    @IsUUID(undefined, {message: 'ID da tarefa inválido.'})
    @IsNotEmpty({message: 'O ID da tarefa é obrigatório.'})
    taskInstanceId: string;

    @IsBoolean({message: 'Aprovação deve ser verdadeiro ou falso'})
    @IsNotEmpty()
    approved: boolean;

    @IsString()
    @IsOptional()
    comment?: string;
}