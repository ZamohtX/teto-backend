import { House as PrismaHouse } from "@prisma/client";
import { House } from "../entities/house.entity";

export class HouseMapper {
    static toDomain(raw: PrismaHouse): House{
        return new House({
            id: raw.id,
            name: raw.name,
            inviteCode: raw.inviteCode,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });
    }
}