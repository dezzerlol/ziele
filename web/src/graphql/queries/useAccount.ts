import { gql, useQuery } from '@apollo/client'

const getAccount = gql`
  query getAccount {
    getAccount {
      id
      email
      avatar
      username
      teams {
        id
        title
        image
      }
    }
  }
`

export default function useAccount() {
  const { data, loading, error } = useQuery(getAccount)

  let account = data?.getAccount

  return { account, loading, error }
}
