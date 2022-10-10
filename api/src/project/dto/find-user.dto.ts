import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, Length } from 'class-validator'

@InputType()
export class FindUserDto {
  @ApiProperty({ example: '1', description: '1' })
  @IsNumber({}, { message: 'Must be a number' })
  @Length(1, 100, { message: 'Must be longer than 1 and shorter than 100' })
  @Field()
  readonly projectId: number

  @ApiProperty({ example: '1', description: '1' })
  @IsNumber({}, { message: 'Must be a number' })
  @Length(1, 100, { message: 'Must be longer than 1 and shorter than 100' })
  @Field()
  readonly userId: number
}
