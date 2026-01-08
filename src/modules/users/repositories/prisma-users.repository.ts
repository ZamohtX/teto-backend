import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { UsersRepository } from "./users.repository";
import { Prisma, User } from "@prisma/client";


@Injectable()
export class PrismaUsersRepository implements UsersRepository {
    constructor(private prisma: PrismaService){}

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return await this.prisma.user.create({
            data,
        });
    }

    async findByEmail(email: string): Promise<User|null> {
        return await this.prisma.user.findUnique({
            where: { email },
        });
    }

    async findById(id: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }


}