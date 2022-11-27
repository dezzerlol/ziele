import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Comment } from 'src/comment/comment.model'
import { Tag } from 'src/project/tag.model'
import { User } from 'src/users/users.model'

@ObjectType('card')
export class Card {
  @Field(() => String, {})
  id: string

  @Field(() => String, {})
  title: string

  @Field(() => Int, {})
  index: number

  @Field(() => String, {})
  issueType: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String, { nullable: true })
  priority?: string

  @Field(() => [User], { nullable: true })
  assignees?: User[]

  @Field(() => String, {})
  columnId: string

  @Field(() => String, {})
  updatedAt: Date

  @Field(() => String, {})
  createdAt: Date

  @Field(() => [Tag], { nullable: true })
  tags?: Tag[]

  @Field(() => [Comment], { nullable: true })
  comments: Comment[]
}
