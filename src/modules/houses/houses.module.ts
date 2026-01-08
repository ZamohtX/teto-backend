import { Module } from "@nestjs/common";
import { HousesService } from "./houses.service";
import { HousesController } from "./houses.controller";
import { PrismaService } from "src/database/prisma.service";
import { HousesRepository } from "./repositories/houses.repositories";
import { PrismaHousesRepository } from "./repositories/prisma-houses.repository";

@Module({
  controllers: [HousesController],
  providers: [
    HousesService,
    PrismaService,
    {
      provide: HousesRepository,
      useClass: PrismaHousesRepository,
    },
  ],
})
export class HousesModule {}