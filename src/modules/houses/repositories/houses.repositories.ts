import { CreateHouseDto } from "../dto/create-house.dto";
import { UpdateHouseDto } from "../dto/update-house.dto";
import { House } from "../entities/house.entity";
import { UserRole } from "../enums/user-role.enum";

export abstract class HousesRepository {
    // Cria Casa
    abstract create(data: CreateHouseDto, inviteCode: string, ownerId: string): Promise<House>;
    // Procura por Codigo de convite  
    abstract findByInviteCode(code: string): Promise<House | null>;
    // Busca membro na casa
    abstract findMember(userId: string, houseId: string): Promise<{role: UserRole} | null>;
    // adiciona membro na casa
    abstract addMember(userId: string, houseId: string): Promise<void>;
    // busca por id
    abstract findById(id: string): Promise<House | null>;
    // Busca todas as casas onde o usuário é membro
    abstract findAllByUserId(userId: string): Promise<House[]>;
    // Atualiza dados da casa
    abstract update(id: string, data: UpdateHouseDto): Promise<House>;
    // Deleta a casa
    abstract delete(id: string): Promise<void>;
}