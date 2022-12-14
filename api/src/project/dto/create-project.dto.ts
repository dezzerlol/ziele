import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

@InputType()
export class CreateProjectDto {
  @ApiProperty({ example: '1', description: '1' })
  @IsString({ message: 'Must be a string' })
  @Field()
  readonly teamId: string

  @ApiProperty({ example: 'Project 1', description: 'Project title' })
  @IsString({ message: 'Must be a string' })
  @Length(1, 100, { message: 'Must be longer than 1 and shorter than 100' })
  @Field()
  readonly title: string
}
