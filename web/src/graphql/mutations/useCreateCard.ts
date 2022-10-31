import { gql, useMutation } from '@apollo/client'

const createCardMutation = gql`
  mutation createCard($data: CreateCardDto!) {
    createCard(data: $data) {
      id
      title
    }
  }
`

export default function useCreateCard() {
  const [mutate, { data, loading, error }] = useMutation(createCardMutation)

  return {mutate, data, loading, error}
}
