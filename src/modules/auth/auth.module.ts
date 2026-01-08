import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from 'src/database/prisma.service';
import { UsersModule } from '../users/users.module'; 

@Module({
  imports: [
    UsersModule, 
    
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || '34321204aA@',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    PrismaService, 
    JwtStrategy
  ],
  exports: [AuthService],
})
export class AuthModule {}