import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateHouseDto } from "./dto/create-house.dto";
import { HousesRepository } from "./repositories/houses.repositories";
import { JoinHouseDto } from "./dto/join-house.dto";


@Injectable()
export class HousesService {
  constructor(private readonly housesRepository: HousesRepository) {}

  private generateInviteCode(houseName: string): string {
    const prefix = houseName.substring(0,3).toUpperCase().replace(/\s/g, 'X') || 'HOU';
  
    const random = Math.floor(1000 + Math.random() * 9000);

    return `${prefix}-${random}`;
  }

  async create(createHouseDto: CreateHouseDto, userId: string) {
    const inviteCode = this.generateInviteCode(createHouseDto.name);
    return await this.housesRepository.create(createHouseDto, inviteCode, userId);
  }

  async joinHouse(joinHouseDto: JoinHouseDto, userId: string){
    const house = await this.housesRepository.findByInviteCode(joinHouseDto.inviteCode);
    if (!house) {
      throw new NotFoundException("Casa não encontrada. Verifique o código");
    }

    const membershiip = await this.housesRepository.findMember(userId, house.id);
    if (membershiip) {
      throw new ConflictException("Você já faz parte desta casa!");
    }
    await this.housesRepository.addMember(userId, house.id);
    
    return {
      message: 'Parabéns! Você entrou na casa com sucesso',
      houseId: house.id,
      houseName: house.name
    };
  }
}