import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: 'o nome não pode ser vazio'})
    @IsString()
    name: string;

    @IsEmail({}, {message: 'Forneça um endereço de email válido'})
    email: string;

    @IsString()
    @MinLength(6, {message: 'A senha deve ter no minimo 6 caracteres'})
    password: string;
}