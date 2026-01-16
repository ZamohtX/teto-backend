import { CreateTradeDto } from "../dto/create-trade.dto";
import { Trade } from "../entities/trade.entity";
import { TradeStatus } from "../enum/trade-status.enum";


export abstract class TradesRepository {
    abstract create(data: CreateTradeDto, offererId: string): Promise<Trade>;

    abstract findById(id: string): Promise<Trade | null>;

    abstract findAllByHouseId(houseId: string): Promise<Trade[]>;

    abstract updateStatus(id: string, status: TradeStatus, accepterId?: string): Promise<Trade>;
}   