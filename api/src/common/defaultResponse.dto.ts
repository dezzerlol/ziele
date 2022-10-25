import { Field, ObjectType } from "@nestjs/graphql"
import { HttpStatus } from '@nestjs/common'

@ObjectType()
export class DefaultResponse {
  @Field()
  status: HttpStatus
  @Field()
  message: string
}
