import { Field, ObjectType } from '@nestjs/graphql'
import graphqlTypeJson from 'graphql-type-json'
import { Project } from 'src/project/project.model'
import { User } from 'src/users/users.model'

@ObjectType()
export class Team {
  @Field(() => String, {})
  id: string

  @Field(() => String, {})
  title: string

  @Field(() => String, { nullable: true })
  image: string

  @Field(() => String, {})
  updatedAt: Date

  @Field(() => String, {})
  createdAt: Date

  @Field(() => [User], {})
  users: Array<User>

  @Field(() => [Project], {})
  projects: Array<User>

}
