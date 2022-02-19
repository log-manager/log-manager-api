import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLogDto {
  @IsString({ message: 'This field must be a string.' })
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  logType: string;

  @IsString({ message: 'This field must be a string.' })
  @IsNotEmpty({ message: 'This field cannot be empty.' })
  content: string;

  @IsOptional()
  @IsDateString({ message: 'This field must be a date.' })
  createdAt?: string;
}
