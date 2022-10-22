import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

@InputType()
export class AddUserToTeamDto {
  @ApiProperty({ example: '1', description: '1' })
  @IsString({ message: 'Must be a string' })
  @Field()
  readonly teamId: string

  @ApiProperty({ example: 'user123', description: 'User name' })
  @IsString({ message: 'Must be a string' })
  @Field()
  readonly username: string
}
