import { Field, ObjectType } from "@nestjs/graphql"
import { HttpStatus } from '@nestjs/common'

@ObjectType()
export class OutputLogin {
  @Field()
  token: string
}

