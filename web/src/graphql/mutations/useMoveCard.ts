import { gql, useMutation } from '@apollo/client'

const moveCardToColumn = gql`
  mutation moveCardToColumn($cardId: String!, $newIndex: Float!, $columnId: String!, $projectId: String!) {
    moveCardToColumn(cardId: $cardId, newIndex: $newIndex, columnId: $columnId, projectId: $projectId) {
      id
      title
    }
  }
`

export default function useMoveCard() {
  const [moveCardMutation, { loading, error }] = useMutation(moveCardToColumn)

  const moveCard = (cardId: string, newIndex: number, columnId: string, projectId: string) => {
    moveCardMutation({
      variables: {
        cardId,
        newIndex,
        columnId,
        projectId,
      },
    })
  }

  return { moveCard, loading, error }
}
