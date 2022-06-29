import { IsArray, IsBoolean, IsDateString, IsIn, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"
import { Relevance } from "src/models/project.entity"

export class UpdateProjectDto {

    @IsString()
    readonly name: string

    @IsString()
    @IsOptional()
    readonly description: string

    @IsArray()
    readonly image: string[]

    @IsDateString()
    @IsOptional()
    readonly init: Date

    @IsNumber()
    @IsOptional()
    readonly durationDays: number

    @IsUrl()
    readonly repositoryLink: string

    @IsUrl()
    @IsOptional()
    readonly deployLink: string

    @IsNumber()
    @IsIn([Relevance.low, Relevance.medium, Relevance.higth])
    readonly relevance: Relevance

    @IsString()
    readonly company: string

    @IsBoolean()
    readonly isActive: boolean
    
}
