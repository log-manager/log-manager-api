import { BaseFactory } from './BaseFactory';
import { Prisma, Logs } from '@prisma/client';
import { randText } from '@ngneat/falso';
import { prisma } from '../utils';

export const LogFactory: BaseFactory<Prisma.LogsCreateInput, Logs> = {
  build: (attrs) => {
    return {
      logType: '1on1',
      content: randText(),
      ...attrs,
    } as Prisma.LogsCreateInput;
  },

  async create(args) {
    return await prisma.logs.create({ data: LogFactory.build(args) });
  },

  createMany: async (count: number, attrs) => {
    return await prisma.$transaction(
      Array.from({ length: count }).map(() => prisma.logs.create({ data: LogFactory.build(attrs) })),
    );
  },
};
