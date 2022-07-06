import { IsArray, IsString } from 'class-validator';

export class CreateUpdateSkillDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly image: string;

  @IsString()
  readonly level: string;
}
