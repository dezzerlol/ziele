import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

@InputType()
export class CreateUserDto {
  @ApiProperty({ example: 'test@mail.com', description: 'User email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  @Field()
  readonly email: string

  @ApiProperty({ example: 'Tester', description: 'User name' })
  @IsString({ message: 'Must be a string' })
  @Length(3, 30, { message: 'Must be longer than 3 and shorter than 30' })
  @Field()
  readonly username: string

  @ApiProperty({ example: '123456', description: 'User password' })
  @IsString({ message: 'Must be a string' })
  @Length(6, 30, { message: 'Must be longer than 4 and shorter than 30' })
  @Field()
  readonly password: string
}
