import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsUUID()
  userId!: string;

  @IsNotEmpty()
  @IsUUID()
  libraryId!: string;

  @IsNotEmpty()
  @IsUUID()
  sheetId!: string;

  @IsNotEmpty()
  @IsUUID()
  planId!: string;
}