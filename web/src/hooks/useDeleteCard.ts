import { gql, useMutation } from '@apollo/client'

const deleteCard = gql`
  mutation deleteCard($cardId: String!) {
    deleteCard(cardId: $cardId) {
      message
      status
    }
  }
`

export default function useDeleteCard() {
  const [mutate, { loading, error }] = useMutation(deleteCard, {
    refetchQueries: ['getProjectColumns'],
    awaitRefetchQueries: true,
  })

  return { mutate, loading, error }
}
