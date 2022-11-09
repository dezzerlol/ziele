import { gql, useQuery } from '@apollo/client'
import { AccountType } from 'types/ziele'

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
        projects {
          id
          title
          image
          team {
            id
            title
          }
        }
      }
    }
  }
`

export default function useAccount() {
  const { data, loading, error } = useQuery(getAccount)

  let account: AccountType = data?.getAccount

  return { account, loading, error }
}
