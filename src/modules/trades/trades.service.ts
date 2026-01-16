import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { TradesRepository } from "./repositories/trades.repository";
import { CreateTradeDto } from "./dto/create-trade.dto";
import { TasksService } from "../tasks/tasks.service";
import { TradeStatus } from "./enum/trade-status.enum";



@Injectable()
export class TradesService {
    constructor(
        private readonly tradesRepository: TradesRepository,
        private readonly tasksService: TasksService,
    ){}

    async create(createDto: CreateTradeDto, userId: string){
        const task = await this.tasksService.findOneInstance(createDto.taskInstanceId);
        
        if (task.assignedToId !== userId){
            throw new ForbiddenException('Você só pode trocar tarefas que pertencem a você');
        }

        // Adionar regra de somente tarefas nao completadas
        
        return this.tradesRepository.create(createDto, userId);
    }


    async accept(tradeId: string, userId: string){
        const trade = await this.tradesRepository.findById(tradeId);
        if (!trade) throw new NotFoundException('Troca não encontrada');
        
        if (trade.status !== TradeStatus.OPEN){
            throw new ConflictException('Esta troca não está mais disponivel');
        }

        if (trade.offererId === userId){
            throw new ConflictException('Você não pode aceitar sua própria oferta.');
        }

        const updatedTrade = await this.tradesRepository.updateStatus(tradeId, TradeStatus.ACCEPTED, userId);
        
        await this.tasksService.updateInstance(trade.taskInstanceId, {
            assignedToId: userId,
        });

        return {
            message: 'Troca realizada com sucesso! A tarefa agora é sua.',
            trade: updatedTrade
        };

    }


    async cancel(tradeId: string, userId: string){
        const trade = await this.tradesRepository.findById(tradeId);

        if (!trade) throw new NotFoundException('Troda não encontrada.');

        if (trade.offererId !== userId){
            throw new ForbiddenException('Apenas o criador da oferta pode cancelá-la');
        }

        if (trade.status !== TradeStatus.OPEN){
            throw new ConflictException('Só é possivel cancelar trocas abertas.');
        }

        return this.tradesRepository.updateStatus(tradeId, TradeStatus.CANCELLED);
    }

    async findAllByHouse(houseId: string){
        return this.tradesRepository.findAllByHouseId(houseId);
    }
}