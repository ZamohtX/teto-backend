import { IsNotEmpty, IsUUID, isUUID } from "class-validator";

export class CreateTradeDto {
    @IsNotEmpty({message: 'O ID da tarefa é obrigatório.'})
    @IsUUID(undefined, {message: 'ID da tarefa inválido.'})
    taskInstanceId: string;
}

