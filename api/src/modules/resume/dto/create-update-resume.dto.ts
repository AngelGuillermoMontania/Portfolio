import { IsString } from 'class-validator';

export class CreateUpdateResumeDto {
  @IsString()
  readonly spanish: string;

  @IsString()
  readonly english: string;
}
