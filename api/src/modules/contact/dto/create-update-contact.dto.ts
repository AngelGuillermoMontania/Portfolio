import { IsEmail, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateUpdateContactDto {
  @IsString()
  @IsUrl()
  readonly linkedin: string;

  @IsString()
  readonly mobile: string;

  @IsString()
  @IsUrl()
  readonly twitter: string;

  @IsString()
  @IsUrl()
  readonly github: string;

  @IsString()
  @IsEmail()
  readonly email: string;
}
