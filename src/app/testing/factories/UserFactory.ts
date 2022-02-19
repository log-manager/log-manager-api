import { prisma } from '../utils';
import { Prisma, User } from '@prisma/client';
import { BaseFactory } from './BaseFactory';
import { randEmail } from '@ngneat/falso';
import { hashSync } from 'bcrypt';

const LOG_TYPES = {
  stand_up: 'Stand Ups',
  '1on1': "1 on 1's",
  eod_updates: 'End of day Updates',
};

export const UserFactory: BaseFactory<Prisma.UserCreateArgs['data'], User> = {
  build: ({ password, ...attrs } = {}) => {
    return {
      email: randEmail(),
      password: hashSync(password ?? 'password', 10),
      logTypes: JSON.stringify(LOG_TYPES),
      ...attrs,
    };
  },
  create: async (attrs) => {
    return await prisma.user.create({ data: UserFactory.build(attrs) });
  },
  createMany: async (count: number, attrs) => {
    return await prisma.$transaction(
      Array.from({ length: count }).map(() => prisma.user.create({ data: UserFactory.build(attrs) })),
    );
  },
};
