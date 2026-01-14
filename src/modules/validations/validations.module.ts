import { Module } from "@nestjs/common";
import { ValidationsController } from "./validations.controller";
import { ValidationsService } from "./validations.service";
import { PrismaService } from "src/database/prisma.service";
import { ValidationsRepository } from "./repositories/validations.repository";
import { PrismaValidationsRepository } from "./repositories/prisma-validations.repository";
import { TasksModule } from "../tasks/tasks.module";


@Module({
    imports: [TasksModule],
    controllers: [ValidationsController],
    providers: [
        ValidationsService,
        PrismaService,
        {
            provide: ValidationsRepository,
            useClass: PrismaValidationsRepository,
        },
    ],
})
export class ValidationsModule{}