import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TasksService } from './tasks.service';

@Injectable()
export class TasksScheduler {
  private readonly logger = new Logger(TasksScheduler.name);

  constructor(private readonly tasksService: TasksService) {}

  // MODO TESTE (A cada 10s):
  @Cron('*/10 * * * * *')
  // MODO PRODUÇÃO (Meia-noite):
  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) 
  async handleCron() {
    this.logger.log('⏰ Cron Job disparado...');
    await this.tasksService.processRecurringTasks();
  }
}