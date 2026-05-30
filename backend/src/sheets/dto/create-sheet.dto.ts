import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSheetDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  sheetCount!: number;

  @IsNotEmpty()
  @IsString()
  libraryId!: string;
}