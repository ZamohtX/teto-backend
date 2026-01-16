import { TradeStatus } from "../enum/trade-status.enum";

export class Trade {
    id: string;
    status: TradeStatus;

    taskInstanceId: string;

    offererId: string;
    accepterId?: string;

    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<Trade>){
        Object.assign(this, partial);
    }
}