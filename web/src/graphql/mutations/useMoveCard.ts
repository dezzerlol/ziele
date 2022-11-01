import { gql, useMutation } from '@apollo/client'

const moveCardToColumn = gql`
  mutation moveCardToColumn($cardId: String!, $columnId: String!, $projectId: String!) {
    moveCardToColumn(cardId: $cardId, columnId: $columnId, projectId: $projectId) {
      id
      title
    }
  }
`

export default function useMoveCard() {
  const [moveCardMutation, { loading, error }] = useMutation(moveCardToColumn)

  const moveCard = (cardId: string, columnId: string, projectId: string) => {
    moveCardMutation({
      variables: {
        cardId,
        columnId,
        projectId,
      },
    })
  }

  return { moveCard, loading, error }
}
