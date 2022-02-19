import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }
}
