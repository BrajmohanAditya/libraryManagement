import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLibraryPriceDto {
  @IsNotEmpty()
  @IsString()
  libraryId!: string;

  @IsNotEmpty()
  @IsString()
  planName!: string;

  @IsNotEmpty()
  @IsString()
  duration!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price!: number;
}