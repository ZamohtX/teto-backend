import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { HousesModule } from './modules/houses/houses.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ValidationsModule } from './modules/validations/validations.module';
import { TradesModule } from './modules/trades/trades.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UsersModule, 
    AuthModule,
    HousesModule, 
    TasksModule,
    ValidationsModule,
    TradesModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
