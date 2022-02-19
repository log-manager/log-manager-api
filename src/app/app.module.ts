import { Module } from '@nestjs/common';
import { PrismaService } from './shared/prisma.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersModule } from './users/users.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [AuthModule, UsersModule, LogsModule],
  providers: [
    {
      provide: APP_GUARD,
      useExisting: JwtAuthGuard,
    },
    PrismaService,
  ],
})
export class AppModule {}
