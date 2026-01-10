import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { UsersRepository } from "./users.repository";
import { User } from "../entities/user.entity";
import { UserMapper } from "../mappers/user.mapper";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
    constructor(private prisma: PrismaService){}

    async create(data: CreateUserDto): Promise<User> {
        const raw = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
        });
        return UserMapper.toDomain(raw);
    }

    async findByEmail(email: string): Promise<User | null> {
        const raw = await this.prisma.user.findUnique({
            where: {email},
        });

        if (!raw) return null;
        return UserMapper.toDomain(raw);
    }

    async findById(id: string): Promise<User | null> {
        const raw = await this.prisma.user.findUnique({
            where: {id},
        });
        
        if (!raw) return null;
        return UserMapper.toDomain(raw);
    }

    async update(id: string, data: UpdateUserDto): Promise<User>{
        const raw = await this.prisma.user.update({
            where: {id},
            data: data,
        });
        return UserMapper.toDomain(raw);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: {id},
        });
    }
}