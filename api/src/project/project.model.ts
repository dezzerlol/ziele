import { Field, ObjectType } from '@nestjs/graphql'
import graphqlTypeJson from 'graphql-type-json'
import { Column } from 'src/column/column.model'
import { User } from 'src/users/users.model'

interface Tags {
  tags: {
    body: string
    color: string
  }
}

@ObjectType('project')
export class Project {
  @Field(() => String, {})
  id: string

  @Field(() => String, {})
  title: string

  @Field(() => String, { nullable: true })
  image?: string

  @Field(() => String, {})
  updatedAt: Date

  @Field(() => String, {})
  createdAt: Date

  @Field(() => [User], {})
  users: Array<User>

  @Field(() => [Column], {})
  columns: Array<Column>

  @Field(() => graphqlTypeJson, { nullable: true })
  tags: Tags

  @Field(() => graphqlTypeJson, {})
  _count: JSON
}
