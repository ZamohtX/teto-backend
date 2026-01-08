import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common";
import { HousesService } from "./houses.service";
import { CreateHouseDto } from "./dto/create-house.dto";
import { JoinHouseDto } from "./dto/join-house.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";



@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService){}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createHouseDto: CreateHouseDto, @Request() req){
    return this.housesService.create(createHouseDto, req.user.id);
  }


  @Post('join')
  @UseGuards(JwtAuthGuard)
  join(@Body() joinHouseDto: JoinHouseDto, @Request() req){
    const userId = req.user.id;
    return this.housesService.joinHouse(joinHouseDto, userId);
  }


}