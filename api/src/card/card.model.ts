import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/users/users.model'
import graphqlTypeJson from 'graphql-type-json'
import { Comment } from 'src/comment/comment.model'

interface Tags {
  tags: {
    body: string
    color: string
  }
}

@ObjectType('card')
export class Card {
  @Field(() => String, {})
  id: string

  @Field(() => String, {})
  title: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String, { nullable: true })
  priority?: string

  @Field(() => [User], { nullable: true })
  assignees: User[]

  @Field(() => String, {})
  columnId: string

  @Field(() => String, {})
  updatedAt: Date

  @Field(() => String, {})
  createdAt: Date

  @Field(() => graphqlTypeJson, { nullable: true })
  tags: Tags

  @Field(() => [Comment], {})
  comments: Comment[]
}
