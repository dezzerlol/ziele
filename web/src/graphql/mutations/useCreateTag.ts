import { gql, useMutation } from '@apollo/client'
import { showNotification } from '@mantine/notifications'

const createTag = gql`
  mutation createCardTag($data: CreateTagDto!) {
    createCardTag(data: $data) {
      status
      message
    }
  }
`

export default function useCreateTag() {
  const [mutate, { loading }] = useMutation(createTag, {
    refetchQueries: ['getProject'],
    awaitRefetchQueries: true,
    onCompleted: () => {
      showNotification({
        title: 'Tag created',
        message: 'Tag has been created successfully',
        color: 'green',
      })
    },
  })

  return { mutate, loading }
}
