import { gql, useQuery } from '@apollo/client'
import { useCallback, useEffect } from 'react'

const getProjectColumns = gql`
  query getProjectColumns($data: GetColumnsDto!) {
    getProjectColumns(data: $data) {
      id
      title
      cards {
        id
        title
        tags {
          id
          color
          body
        }
      }
    }
  }
`

const cardCreated = gql`
  subscription cardCreated($columnId: String!) {
    cardCreated(columnId: $columnId) {
      id
      title
      columnId
      tags {
        id
        color
        body
      }
    }
  }
`

export default function useColumns(teamTitle: string, projectId: string) {
  const { data, loading, error, subscribeToMore } = useQuery(getProjectColumns, {
    variables: { data: { teamTitle, projectId } },
  })

  const columnIds = data?.getProjectColumns.map((column: any) => column.id)

  const subscribeToCardCreate = useCallback(() => {
    columnIds.forEach((columnId: any) => {
      subscribeToMore({
        document: cardCreated,
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
  }, [JSON.stringify(columnIds)])

  useEffect(() => {
    if (columnIds) {
      subscribeToCardCreate()
    }
  }, [JSON.stringify(columnIds)])

  return { data, loading, error }
}
