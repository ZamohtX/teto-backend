import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Passport } from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            // 1. Busca o token no cabeçalho Authroization: Bearer <token>
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            // 2. Rejeita tokens vencidos
            ignoreExpiration: false,

            // 3, Estabelece uma senha para desencriptar pelo JWT_SECRET no .env
            secretOrKey: process.env.JWT_SECRET || '34321204aA@',
        });
    }

    // 4. Validação: Se o o token for valido, o nest roda essa função.
    async validate(payload: any){ // payload é o json que estava escondido dentro do token
        console.log('--- VALIDANDO TOKEN ---');
        console.log('Payload recebido:', payload);
        return {id: payload.sub, email: payload.email};
    } 


}