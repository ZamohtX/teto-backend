import { Trade as PrismaTrade } from "@prisma/client";
import { Trade } from "../entities/trade.entity";
import { TradeStatus } from "../enum/trade-status.enum";

export class TradeMapper {
    static toDomain(raw: PrismaTrade): Trade{
        return new Trade({
            id: raw.id,
            status: raw.status as unknown as TradeStatus,

            taskInstanceId: raw.taskInstanceId,
            offererId: raw.offererId,
            accepterId: raw.accepterId || undefined,

            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        })
    }
}






