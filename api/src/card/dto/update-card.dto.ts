import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNumber, IsOptional, IsString, Length } from 'class-validator'

@InputType()
export class UpdateCardDto {
  @ApiProperty({ example: '1', description: 'Id of card that should be updated' })
  @IsNumber({}, { message: 'Must be a number' })
  @Field()
  readonly cardId: number

  @ApiProperty({ example: 'Dev', description: 'New card title', required: false })
  @IsString({ message: 'Must be a string' })
  @Length(1, 100, { message: 'Must be longer than 1 and shorter than 100' })
  @IsOptional()
  @Field({ nullable: true })
  readonly title: string

  @ApiProperty({ example: 'Issue description', description: 'New card description', required: false })
  @IsString({ message: 'Must be a string' })
  @IsOptional()
  @Field({ nullable: true })
  readonly description?: string

  @ApiProperty({ example: '1', description: 'New card assignee id', required: false })
  @IsNumber({}, { message: 'Must be a number' })
  @IsOptional()
  @Field({ nullable: true })
  readonly assigneeId?: number

  @ApiProperty({ example: '1', description: 'New card tag id', required: false })
  @IsNumber({}, { message: 'Must be a number' })
  @IsOptional()
  @Field({ nullable: true })
  readonly tagId: number
}
