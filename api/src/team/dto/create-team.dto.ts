import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsOptional, IsString, Length } from 'class-validator'

@InputType()
export class CreateTeamDto {
  @ApiProperty({ example: 'Project 1', description: 'Project title' })
  @IsString({ message: 'Must be a string' })
  @Length(1, 100, { message: 'Must be longer than 1 and shorter than 100' })
  @Field()
  readonly title: string

  @ApiProperty({ example: 'Project 1', description: 'Project title' })
  @IsArray({ message: 'Must be an array' })
  @IsString({ each: true })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  readonly users?: []
}
