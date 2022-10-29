import { gql, useQuery } from '@apollo/client'
import { CardType } from 'types/ziele'

const getCard = gql`
  query getCard($cardId: String!) {
    getCard(cardId: $cardId) {
      id
      title
      description
      priority
      assignees {
        id
        username
        avatar
      }
      tags {
        id
        color
        body
      }
      comments {
        id
        body
        userId
        author
      }
      createdAt
      updatedAt
    }
  }
`

export default function useIssueCard(issueId: string) {
  const { data, loading, error } = useQuery(getCard, { variables: { cardId: issueId } })

  const issue: CardType = data?.getCard

  return { issue, loading, error }
}
