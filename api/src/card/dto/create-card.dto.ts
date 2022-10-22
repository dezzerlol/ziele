import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsOptional, IsString, Length } from 'class-validator'

@InputType()
export class CreateCardDto {
  @ApiProperty({ example: 'Dev', description: 'Card title' })
  @IsString({ message: 'Must be a string' })
  @Length(1, 100, { message: 'Must be longer than 1 and shorter than 100' })
  @Field()
  readonly title: string

  @ApiProperty({ example: '1', description: 'Id of column where card should be added' })
  @IsString({ message: 'Must be a string' })
  @Field()
  readonly columnId: string

  @ApiProperty({ example: 'Issue description', description: 'Card description', required: false })
  @IsString({ message: 'Must be a string' })
  @IsOptional()
  @Field({ nullable: true })
  readonly description?: string

  @ApiProperty({ example: '[1,2,3]', description: 'Card assignees', required: false })
  @IsArray({ message: 'Must be an array' })
  @IsString({ each: true })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  readonly assigneeIds?: string[]

  @ApiProperty({ example: '1', description: 'Card tag id', required: false })
  @IsString({ message: 'Must be a number' })
  @IsOptional()
  @Field({ nullable: true })
  readonly tagId?: string
}
