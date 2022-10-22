export type ProjectType = {
  id: string
  title: string
  image: string | null
  updatedAt: string
  createdAt: string
  users: []
  _count: { users: number }
}

export type CardType = {
  id: string
  title: string
}

export type ColumnType = {
  cards: CardType[]
  id: string
  title: string
}
