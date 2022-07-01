import { IsString } from 'class-validator';

export class CreateUpdateAboutDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly location: string;

  @IsString()
  readonly englishLevel: string;
}
