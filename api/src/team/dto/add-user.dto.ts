import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, Length } from 'class-validator'

@InputType()
export class AddUserToTeamDto {
  @ApiProperty({ example: '1', description: '1' })
  @IsNumber({}, { message: 'Must be a number' })
  @Length(1, 100, { message: 'Must be longer than 1 and shorter than 100' })
  @Field()
  readonly teamId: number

  @ApiProperty({ example: 'user123', description: 'User name' })
  @IsString({ message: 'Must be a string' })
  @Field()
  readonly username: string
}
