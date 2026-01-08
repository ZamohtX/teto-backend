import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    // Conecta no banco assim que o modulo iniciar
    async  onModuleInit() {
        await this.$connect();
    }

    // Desconecta quando a aplicação fechar
    async onModuleDestroy() {
        await this.$disconnect();
    }
}