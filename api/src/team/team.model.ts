import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Project } from 'src/project/project.model'
import { User } from 'src/users/users.model'

@ObjectType()
export class Team {
  @Field(() => Int, {})
  id: number

  @Field(() => String, {})
  title: string

  @Field(() => String, {})
  updatedAt: Date

  @Field(() => String, {})
  createdAt: Date

  @Field(() => [User], {})
  users: Array<User>

  @Field(() => [Project], {})
  projects: Array<User>
}
