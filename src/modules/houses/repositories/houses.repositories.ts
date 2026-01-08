import { CreateHouseDto } from "../dto/create-house.dto";
import { House } from "../entities/house.entity";
import { UserRole } from "../enums/user-role.enum";

export abstract class HousesRepository {
    abstract create(data: CreateHouseDto, inviteCode: string, ownerId: string): Promise<House>;


    abstract findByInviteCode(code: string): Promise<House | null>;


    abstract findMember(userId: string, houseId: string): Promise<{role: UserRole} | null>;

    abstract addMember(userId: string, houseId: string): Promise<void>;

}