import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('comment')
export class Comment {
  @Field(() => String, {})
  id: string

  @Field(() => String, {})
  cardId: string

  @Field(() => String, {})
  userId: string

  @Field(() => String, {})
  body: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String, {})
  updatedAt: Date

  @Field(() => String, {})
  createdAt: Date
}
