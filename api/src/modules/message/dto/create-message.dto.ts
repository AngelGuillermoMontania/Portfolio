import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly body: string;

  @IsString()
  readonly email: string;
}
