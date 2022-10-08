import { Field, Int, ObjectType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { Project } from 'src/project/project.model'

@ObjectType()
export class User {
  @Field(() => Int, {})
  id: number

  @Field(() => String, {})
  username: string

  @Field(() => String, {})
  @IsEmail()
  email: string

  @Field(() => String, {})
  password: string

  @Field(() => String, { nullable: true })
  avatar?: string

  @Field(() => String, {})
  updatedAt: Date

  @Field(() => String, {})
  createdAt: Date

  @Field(() => [Project], {})
  projects: []

  // @Field(() => [], {})
  // cards: []

  // @Field(() => [], {})
  // comments: []
}
