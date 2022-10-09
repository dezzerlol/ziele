import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Card } from 'src/card/card.model'


@ObjectType()
export class Column {
  @Field(() => Int, {})
  id: number

  @Field(() => String, {})
  title: string

  @Field(() => String, {})
  updatedAt: Date

  @Field(() => String, {})
  createdAt: Date

  @Field(() => Int, {})
  projectId: number

  @Field(() => [Card], {})
  cards: Array<Card>
}
