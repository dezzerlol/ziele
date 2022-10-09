import { gql, useQuery } from '@apollo/client'
import { useCallback, useEffect } from 'react'

const Query = gql`
  query getProjectColumns($projectId: Float!) {
    getProjectColumns(projectId: $projectId) {
      id
      title
      cards {
        id
        title
      }
    }
  }
`

const Subscription = gql`
  subscription cardCreated($columnId: Float!) {
    cardCreated(columnId: $columnId) {
      id
      title
      columnId
    }
  }
`

export default function useColumns(projectId: number) {
  const { data, loading, error, subscribeToMore } = useQuery(Query, { variables: { projectId } })

  const columnIds = data?.getProjectColumns.map((column: any) => column.id)

  const subscribeToColumn = useCallback(() => {
    columnIds.forEach((columnId: any) => {
      subscribeToMore({
        document: Subscription,
        variables: { columnId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const newCard = subscriptionData.data.cardCreated
          return {
            ...prev,
            getProjectColumns: prev.getProjectColumns.map((column: any) => {
              if (column.id === newCard.columnId) {
                return {
                  ...column,
                  cards: [...column.cards, newCard],
                }
              }
              return column
            }),
          }
        },
      })
    })
  }, [columnIds])

  useEffect(() => {
    columnIds && subscribeToColumn()
  }, [JSON.stringify(columnIds)])

  return { data, loading, error }
}
