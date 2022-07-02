import { IsString } from 'class-validator';

export class CreateUpdateToolDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly image: string;

  @IsString()
  readonly nivel: string;
}
