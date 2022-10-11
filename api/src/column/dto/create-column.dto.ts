import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, Length } from 'class-validator'

@InputType()
export class CreateColumnDto {
  @ApiProperty({ example: 'Column 1', description: 'Column title' })
  @IsString({ message: 'Must be a string' })
  @Length(1, 100, { message: 'Must be longer than 1 and shorter than 100' })
  @Field()
  readonly title: string

  @ApiProperty({ example: '1', description: 'Id of project where column should be added' })
  @IsNumber({}, { message: 'Must be a number' })
  @Field()
  readonly projectId: number
}