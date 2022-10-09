import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString, Length } from 'class-validator'

@InputType()
export class CreateCardDto {
  @ApiProperty({ example: 'Dev', description: 'Card title' })
  @IsString({ message: 'Must be a string' })
  @Length(1, 100, { message: 'Must be longer than 1 and shorter than 100' })
  @Field()
  readonly title: string

  @ApiProperty({ example: '1', description: 'Id of column where card should be added' })
  @IsNumber({}, { message: 'Must be a number' })
  @Field()
  readonly columnId: number

  @ApiProperty({ example: '1', description: 'Card description', required: false })
  @IsString({ message: 'Must be a string' })
  @IsOptional()
  @Field({ nullable: true })
  readonly description?: string
}
