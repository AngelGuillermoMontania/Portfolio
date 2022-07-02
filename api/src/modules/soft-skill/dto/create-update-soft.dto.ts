import { IsString } from 'class-validator';

export class CreateUpdateSoftDto {
  @IsString()
  name: string;
}
