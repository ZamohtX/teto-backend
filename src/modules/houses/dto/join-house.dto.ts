import { IsNotEmpty, IsString } from "class-validator";

export class JoinHouseDto {
    @IsString({message: 'O código deve ser um texto'})
    @IsNotEmpty({message: 'O código de convite é obrigatório.'})
    inviteCode: string;
}
