import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor (
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // 1. Busca o usuário no banco
        const user = await this.usersService.findByEmail(email);

        // 2. Se o usuário não existe, lança erro
        if (!user) {
            throw new UnauthorizedException('Credenciais Invalidas');
        }

        // 3. Compara a senha enviada com o Hash do Banco
        // CORREÇÃO AQUI: Mudamos de user.passwordHash para user.password
        // O banco chama a coluna de 'password', mesmo contendo um hash.
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid){
            throw new UnauthorizedException('Credenciais Invalidas');
        }

        // 4. Gerar o Token
        const payload = { sub: user.id, email: user.email };

        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    }
}