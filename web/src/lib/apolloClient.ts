import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'
import { createClient } from 'graphql-ws'

const graphqlUrl = 'http://localhost:5000/graphql'
const wsUrl = 'ws://localhost:5000/graphql'

const httpLink = new HttpLink({
  uri: graphqlUrl,
  credentials: 'include',
})

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: wsUrl,
        })
      )
    : null

const authLink = setContext((req, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = 'lol'
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const link =
  typeof window !== 'undefined' && wsLink != null
    ? split(
        ({ query }) => {
          const def = getMainDefinition(query)
          return def.kind === 'OperationDefinition' && def.operation === 'subscription'
        },
        wsLink,
        httpLink
      )
    : httpLink

const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  credentials: 'include',
})

export default apolloClient
