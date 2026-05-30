import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLibraryFeatureDto {
  @IsNotEmpty()
  @IsString()
  libraryId!: string;

  @IsNotEmpty()
  @IsString()
  featureName!: string;
}