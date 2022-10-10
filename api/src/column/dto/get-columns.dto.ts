import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, Length } from 'class-validator'

@InputType()
export class GetColumnsDto {

  @ApiProperty({ example: '1', description: 'Id of project where column should be added' })
  @IsNumber({}, { message: 'Must be a number' })
  @Field()
  readonly projectId: number
}
