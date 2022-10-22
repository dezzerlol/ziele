import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Card } from 'src/card/card.model'


@ObjectType()
export class Column {
  @Field(() => String, {})
  id: string

  @Field(() => String, {})
  title: string

  @Field(() => String, {})
  updatedAt: Date

  @Field(() => String, {})
  createdAt: Date

  @Field(() => String, {})
  projectId: string

  @Field(() => [Card], {})
  cards: Array<Card>
}
