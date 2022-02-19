import { Prisma } from '@prisma/client';

export class ListLogsDto {
  showArchived?: boolean;
  skip?: number;
  take?: number;
  orderBy?: keyof Prisma.LogsOrderByWithAggregationInput;
  orderDirection?: 'asc' | 'desc';
}
