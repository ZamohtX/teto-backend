import { Controller, Post, Body, UseGuards, Request, Get, Param, Patch, Delete } from "@nestjs/common";
import { HousesService } from "./houses.service";
import { CreateHouseDto } from "./dto/create-house.dto";
import { JoinHouseDto } from "./dto/join-house.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UpdateHouseDto } from "./dto/update-house.dto";



@Controller('houses')
export class HousesController {
  
  constructor(private readonly housesService: HousesService){}


  // Criar Casa
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createHouseDto: CreateHouseDto, @Request() req){
    return this.housesService.create(createHouseDto, req.user.id);
  }


  // Entrar na Casa
  @Post('join')
  @UseGuards(JwtAuthGuard)
  join(@Body() joinHouseDto: JoinHouseDto, @Request() req){
    const userId = req.user.id;
    return this.housesService.joinHouse(joinHouseDto, userId);
  }


  // Lista todas as casas do usuário
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req){
    return this.housesService.findAll(req.user.id);
  }


  // Lista uma casa especifica
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string){
    return this.housesService.findOne(id);
  }


  // Atualizar casa
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto, @Request() req){
    return this.housesService.update(id, updateHouseDto, req.user.id);
  }


  // Deletar casa
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req){
    return this.housesService.remove(id, req.user.id);
  }
}