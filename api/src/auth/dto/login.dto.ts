import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

@InputType()
export class LoginDto {
  @ApiProperty({ example: 'test@mail.com', description: 'User email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  @Field(() => String)
  readonly email: string

  @ApiProperty({ example: '123456', description: 'User password' })
  @IsString({ message: 'Must be a string' })
  @Length(4, 30, { message: 'Must be longer than 4 and shorter than 30' })
  @Field(() => String)
  readonly password: string
}
