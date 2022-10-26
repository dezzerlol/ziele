import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

@InputType()
export class AddCommentDto {
  @ApiProperty({ example: 'Test test 13', description: 'Card comment' })
  @IsString({ message: 'Must be a string' })
  @Length(1, 300, { message: 'Must be longer than 1 and shorter than 300' })
  @Field()
  readonly body: string

  @ApiProperty({ example: '1', description: 'Id of card where comment should be added' })
  @IsString({ message: 'Must be a string' })
  @Field()
  readonly cardId: string

  @ApiProperty({ example: '1', description: 'User id' })
  @IsString({ message: 'Must be a string' })
  @Field()
  readonly userId: string
}
