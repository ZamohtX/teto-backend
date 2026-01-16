import { Injectable } from "@nestjs/common";
import { TradesRepository } from "./trades.repository";
import { PrismaService } from "src/database/prisma.service";
import { CreateTradeDto } from "../dto/create-trade.dto";
import { Trade } from "../entities/trade.entity";
import { TradeMapper } from "../mappers/trade.mapper";
import { TradeStatus } from "../enum/trade-status.enum";
import { TradeStatus as PrismaTradeStatus } from "@prisma/client";

@Injectable()
export class PrismaTradesRepository implements TradesRepository {
    constructor(private readonly prisma: PrismaService){}

    async create(data: CreateTradeDto, offererId: string): Promise<Trade> {
        const raw = await this.prisma.trade.create({
            data: {
                taskInstanceId: data.taskInstanceId,
                offererId: offererId,
                status: PrismaTradeStatus.OPEN
            }
        });
        return TradeMapper.toDomain(raw);
    }

    async findById(id: string): Promise<Trade | null> {
        const raw = await this.prisma.trade.findUnique({
            where: {id},
        });
        if (!raw) return null;
        return TradeMapper.toDomain(raw);
    }


    async findAllByHouseId(houseId: string): Promise<Trade[]>{
        const rawList = await this.prisma.trade.findMany({
            where: {
                taskInstance: {
                    taskDef: {
                        houseId: houseId
                    }
                },
                status: PrismaTradeStatus.OPEN
            },
            orderBy: { createdAt: 'desc'},
        });
        return rawList.map(TradeMapper.toDomain);
    }

    async updateStatus(id: string, status: TradeStatus, accepterId?: string): Promise<Trade> {
        const raw = await this.prisma.trade.update({
            where: { id },
            data: {
                status: status as unknown as PrismaTradeStatus,
                accepterId: accepterId
            } 
        });
        return TradeMapper.toDomain(raw);
    }
}