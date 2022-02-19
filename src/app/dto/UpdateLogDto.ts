import { PartialType } from '@nestjs/mapped-types';
import { CreateLogDto } from './CreateLogDto';

export class UpdateLogDto extends PartialType(CreateLogDto) {}
