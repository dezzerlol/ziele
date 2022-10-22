import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

@InputType()
export class FindUserDto {
  @ApiProperty({ example: '1', description: '1' })
  @IsString({ message: 'Must be a string' })
  @Field()
  readonly projectId: string

  @ApiProperty({ example: '1', description: '1' })
  @IsString({ message: 'Must be a string' })
  @Field()
  readonly userId: string
}
