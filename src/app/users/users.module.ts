import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../shared/prisma.service';

@Module({
  controllers: [],
  providers: [PrismaService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
