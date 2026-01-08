import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/database/prisma.service';
import { TasksRepository } from './repositories/tasks.repository';
import { PrismaTasksRepository } from './repositories/prima-tasks.repository';
import { TasksScheduler } from './tasks.scheduler';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    PrismaService,
    TasksScheduler,
    {
      provide: TasksRepository,
      useClass: PrismaTasksRepository,
    },
  ],
})
export class TasksModule {}