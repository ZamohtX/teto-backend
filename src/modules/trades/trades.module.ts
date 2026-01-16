import { Module } from '@nestjs/common'
import { TradesController } from './trades.controller'
import { TradesService } from './trades.service'
import { PrismaService } from 'src/database/prisma.service'
import { TradesRepository } from './repositories/trades.repository'
import { PrismaTradesRepository } from './repositories/prisma-trades.repository'
import { TasksModule } from '../tasks/tasks.module'


@Module({
    imports: [TasksModule],
    controllers: [TradesController],
    providers: [
        TradesService,
        PrismaService,
        {
            provide: TradesRepository,
            useClass: PrismaTradesRepository,
        },
    ],
})
export class TradesModule {}