import { IsString } from 'class-validator';

export class CreateUpdateReferenceDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly message: string;

  readonly image: string;
}
