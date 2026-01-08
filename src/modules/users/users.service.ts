import { Injectable, ConflictException } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async create(createUserDto: CreateUserDto) {
        // Verificar se usuario ja existe
        const userExists = await this.usersRepository.findByEmail(createUserDto.email);
        if (userExists) {
            throw new ConflictException('Email already exists');
        }

        // Hash da Senha
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(createUserDto.password, salt);

        // Removemos a senha pura do DTO para não usar por engano
        const { password, ...userData } = createUserDto;

        // Montamos o objeto para o Banco
        const dataToSave = {
            ...userData,
            // AQUI ESTÁ A CORREÇÃO:
            // A chave do objeto deve ser 'password' (igual ao schema.prisma),
            // mas o valor é o hash que geramos.
            password: passwordHash, 
        };

        const newUser = await this.usersRepository.create(dataToSave);

        // AQUI TAMBÉM:
        // O objeto que volta do banco tem a propriedade 'password', não 'passwordHash'.
        // Desestruturamos para remover a senha do retorno (segurança).
        const { password: _, ...result } = newUser;
        
        return result;
    }

    async findByEmail(email: string){
        return this.usersRepository.findByEmail(email);
    }
}