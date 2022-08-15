import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateUpdateProjectDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  readonly image: string;

  @IsDateString()
  @IsOptional()
  readonly dateInit: Date;

  @IsDateString()
  @IsOptional()
  readonly dateEnd: Date;

  @IsUrl()
  readonly repositoryLink: string;

  @IsUrl()
  @IsOptional()
  readonly deployLink: string;

  @IsNumber()
  readonly relevance: number;

  @IsString()
  @IsOptional()
  readonly company: string;

  @IsBoolean()
  readonly isActive: boolean;

  @IsArray()
  readonly tools: string[];

  @IsArray()
  readonly skills: string[];
}
