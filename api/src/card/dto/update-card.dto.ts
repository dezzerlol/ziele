import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, Length } from 'class-validator'

@InputType()
export class UpdateCardDto {
  @ApiProperty({ example: '1', description: 'Id of card that should be updated' })
  @IsString({ message: 'Must be a string' })
  @Field()
  readonly cardId: string

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
  @IsString({ message: 'Must be a string' })
  @IsOptional()
  @Field({ nullable: true })
  readonly assigneeId?: string

  @ApiProperty({ example: '1', description: 'New card tag id', required: false })
  @IsString({ message: 'Must be a string' })
  @IsOptional()
  @Field({ nullable: true })
  readonly tagId: string
}
