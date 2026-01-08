import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateHouseDto {
    @IsString({message: 'O nome deve ser um texto.'})
    @IsNotEmpty({message: 'o nome da casa é obrigatório.'})
    @MinLength(3, {message: 'O nome da casa deve ter pelo menos 3 letras.'})
    name: string;
}