import { Field, ObjectType } from '@nestjs/graphql'

export const colors = [
  'default',
  'dark',
  'gray',
  'red',
  'pink',
  'grape',
  'violet',
  'indigo',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'orange',
]

type Color = typeof colors[number]

@ObjectType('tag')
export class Tag {
  @Field(() => String, {})
  id: string

  @Field(() => String, {})
  body: string

  @Field(() => String)
  color: Color

  @Field(() => String, {})
  updatedAt: Date

  @Field(() => String, {})
  createdAt: Date
}
