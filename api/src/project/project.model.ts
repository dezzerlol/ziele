import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from 'src/users/users.model'

@ObjectType()
export class Project {
  @Field(() => Int, {})
  id: number

  @Field(() => String, {})
  title: string

  @Field(() => String, { nullable: true })
  image?: string

  @Field(() => Int, {})
  updatedAt: number

  @Field(() => Int, {})
  createdAt: number

  @Field(() => [User], {})
  users: number
}
