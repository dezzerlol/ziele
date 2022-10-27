import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

@InputType()
export class CreateTagDto {
  @ApiProperty({ example: '1', description: '1' })
  @IsString({ message: 'Must be a string' })
  @Field()
  readonly projectId: string

  @ApiProperty({ example: '1', description: 'tag body' })
  @IsString({ message: 'Must be a string' })
  @Length(1, 8, { message: 'Must be longer than 1 and shorter than 8' })
  @Field()
  readonly body: string

  @ApiProperty({ example: '#FFFFFF', description: 'tag color' })
  @IsString({ message: 'Must be a string' })
  @Length(1, 7, { message: 'Must be longer than 1 and shorter than 100' })
  @Field()
  readonly color: string
}
