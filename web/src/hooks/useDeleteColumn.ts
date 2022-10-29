import { gql, useMutation } from '@apollo/client'

const Mutation = gql`
  mutation deleteColumn($columnId: String!, $projectId: String!) {
    deleteColumn(columnId: $columnId, projectId: $projectId) {
      status
      message
    }
  }
`

export default function useDeleteColumn() {
  const [mutate, { data, loading, error }] = useMutation(Mutation, {
    onError: (error) => {},
    onCompleted: () => {},
    refetchQueries: ['getProjectColumns'],
    awaitRefetchQueries: true,
  })

  return { mutate, loading, error }
}
