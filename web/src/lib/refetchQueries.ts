import apolloClient from './apolloClient'

export const refetchQueries = (arrayOfQueries: string[]) => {
  apolloClient.refetchQueries({
    include: arrayOfQueries,
  })
}
