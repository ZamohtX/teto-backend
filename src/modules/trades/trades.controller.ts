import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { TradesService } from "./trades.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateTradeDto } from "./dto/create-trade.dto";


@Controller('trades')
export class TradesController{
    constructor(private readonly tradesService: TradesService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createDto: CreateTradeDto, @Request() req){
        return this.tradesService.create(createDto, req.user.id);
    }


    @Patch(':id/accept')
    @UseGuards(JwtAuthGuard)
    accept(@Param('id') id: string, @Request() req){
        return this.tradesService.accept(id, req.user.id);
    }

    
    @Patch(':id/cancel')
    @UseGuards(JwtAuthGuard)
    cancel(@Param('id') id: string, @Request() req){
        return this.tradesService.cancel(id, req.user.id);
    }


    @Get('house/:houseId')
    @UseGuards(JwtAuthGuard)
    findAllByHouse(@Param('houseId') houseId: string){
        return this.tradesService.findAllByHouse(houseId);
    }
}