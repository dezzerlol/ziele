import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Column } from 'src/column/column.model'
import { User } from 'src/users/users.model'

@ObjectType()
export class Project {
  @Field(() => Int, {})
  id: number

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
}
