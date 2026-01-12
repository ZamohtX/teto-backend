import { Injectable } from "@nestjs/common";
import { HousesRepository } from "./houses.repositories";
import { PrismaService } from "src/database/prisma.service";
import { CreateHouseDto } from "../dto/create-house.dto";
import { House } from "../entities/house.entity";
import { UserRole as PrismaUserRole } from "@prisma/client";
import { UserRole } from "../enums/user-role.enum";
import { HouseMapper } from "../mappers/house.mapper";
import { UpdateHouseDto } from "../dto/update-house.dto";

@Injectable()
export class PrismaHousesRepository implements HousesRepository {
    constructor (private prisma: PrismaService){}

    async create(data: CreateHouseDto, inviteCode: string, ownerId: string): Promise<House> {
        const rawHouse = await this.prisma.$transaction(async (tx) => {
            const house = await tx.house.create({
                data: {
                    name: data.name,
                    inviteCode: inviteCode,
                },
            });

            await tx.membership.create({
                data: {
                    userId: ownerId,
                    houseId: house.id,
                    role: PrismaUserRole.ADMIN,
                    points: 0,
                    reputation: 100,
                },
            });
            return house;
        });
        return HouseMapper.toDomain(rawHouse);
    }


    async findByInviteCode(code: string): Promise<House | null> {
        const raw = await this.prisma.house.findUnique({
            where: { inviteCode: code },
        });
        if (!raw) return null;
        return HouseMapper.toDomain(raw);
    }

    async findMember(userId: string, houseId: string): Promise<{role: UserRole} | null> {
        const member = await this.prisma.membership.findUnique({
            where: {
                userId_houseId: {userId, houseId},
            },
        });

        if (!member) return null;

        const role = member.role === PrismaUserRole.ADMIN ? UserRole.ADMIN:UserRole.MEMBER;
        
        return { role };
    }

    async addMember(userId: string, houseId: string): Promise<void>{
        await this.prisma.membership.create({
            data: {
                userId,
                houseId,
                role: PrismaUserRole.MEMBER,
                points: 0,
                reputation: 100,
            },
        });
    }

    async findById(id: string): Promise<House | null> {
        const raw = await this.prisma.house.findUnique({
            where: {id},
        });
        if (!raw) return null;
        return HouseMapper.toDomain(raw);
    }

    async findAllByUserId(userId: string): Promise<House[]> {
        // Buscamos as Memberships desse usuário e incluimos os dados da casa
        const memberships = await this.prisma.membership.findMany({
            where: { userId },
            include: { house: true }, // JOIN com a tabela House
        });
        return memberships.map(m=>HouseMapper.toDomain(m.house));
    }

    async update(id: string, data: UpdateHouseDto): Promise<House> {
        const raw = await this.prisma.house.update({
            where: { id },
            data: data,
        });
        return HouseMapper.toDomain(raw);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.house.delete({
            where: { id }
        });
    }


    


}