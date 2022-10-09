import React, { useEffect } from 'react'
import { gql, useQuery, useSubscription } from '@apollo/client'

export const columnFragment = gql`
  query getCards($columnId: Float!) {
    getCards(columnId: $columnId) {
      id
      title
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

const Column = ({ column }: any) => {
  /* const { data, loading, error, subscribeToMore } = useQuery(columnFragment, { variables: { columnId: column.id } })

  useEffect(() => {
    subscribeToMore({
      document: Subscription,
      variables: { columnId: column.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newCard = subscriptionData.data.cardCreated
        return {
          ...prev,
          getCards: [...prev.getCards, newCard],
        }
      },
    })
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div> */

  return (
    <div>
      <div className='column'>
        <h2>{column.title}</h2>
        {column.cards.map((card: any) => (
          <div className='card' key={card.id}>
            {card.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Column
