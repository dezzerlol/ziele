import { Field, InputType } from '@nestjs/graphql'
import { IsString, Length } from 'class-validator'

@InputType()
export class GetColumnsDto {
  @IsString({ message: 'Must be a string' })
  @Length(1, 100, { message: 'Must be longer than 1 and shorter than 100' })
  @Field()
  readonly teamTitle: string

  @IsString({ message: 'Must be a string' })
  @Length(1, 100, { message: 'Must be longer than 1 and shorter than 100' })
  @Field()
  readonly projectId: string
}
