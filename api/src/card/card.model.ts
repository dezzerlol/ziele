import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from 'src/users/users.model'

@ObjectType()
export class Card {
  @Field(() => Int, {})
  id: number

  @Field(() => String, {})
  title: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String, {})
  updatedAt: Date

  @Field(() => String, {})
  createdAt: Date

  @Field(() => [User], {})
  assignees: Array<User>

  @Field(() => Int, {})
  columnId: number

  //   @Field(() => [Tag], {})
  //   tags: Array<Tag>

  //   @Field(() => [Comment], {})
  //   tags: Array<Comments>
}
