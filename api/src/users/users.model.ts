import { Field, ObjectType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { Card } from 'src/card/card.model'
import { Project } from 'src/project/project.model'
import graphqlTypeJson from 'graphql-type-json'

@ObjectType()
export class User {
  @Field(() => String, {})
  id: string

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

  @Field(() => [Card], {})
  cards: []


  // @Field(() => [], {})
  // comments: []
}
