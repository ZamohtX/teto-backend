import { User as PrismaUser } from "@prisma/client";
import { User } from "../entities/user.entity";

export class UserMapper {
    static toDomain(raw: PrismaUser): User {
        return new User({
            id: raw.id,
            name: raw.name,
            email: raw.email,
            password: raw.password, // Passamos a senha hashada para o Auth Service usar
            avatarUrl: raw.avatarUrl || undefined,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }
}