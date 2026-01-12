import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateHouseDto } from "./dto/create-house.dto";
import { HousesRepository } from "./repositories/houses.repositories";
import { JoinHouseDto } from "./dto/join-house.dto";
import { UpdateHouseDto } from "./dto/update-house.dto";
import { UserRole } from "./enums/user-role.enum";


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

  // Listar minhas casas
  findAll(userId: string){
    return this.housesRepository.findAllByUserId(userId);
  }

  // Detalhes de uma casa
  async findOne(id: string){
    const house = await this.housesRepository.findById(id);
    if (!house) {
      throw new NotFoundException('Casa não encontrada');
    }
    return house;
  }

  // Atualizar
  async update(houseId: string, updateHouseDto: UpdateHouseDto, userId: string){
    await this.checkAdminPermission(houseId, userId); // Verifica a permissão
    return this.housesRepository.update(houseId, updateHouseDto);
  }

  // Deletar
  async remove(houseId: string, userId: string){
    await this.checkAdminPermission(houseId, userId); // Verifica a permissão
    return this.housesRepository.delete(houseId);
  }

  private async checkAdminPermission(houseId: string, userId: string){
    const house = await this.housesRepository.findById(houseId);
    if (!house) throw new NotFoundException('Casa não encontrada');

    const member = await this.housesRepository.findMember(userId, houseId);

    if (!member || member.role !== UserRole.ADMIN){
      throw new ForbiddenException('Apenas administradores podem realizar esta ação');
    }
  }
}