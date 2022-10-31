import { ApolloClient, from, HttpLink, InMemoryCache, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'
import { createClient } from 'graphql-ws'
import { onError } from '@apollo/client/link/error'

const graphqlUrl = 'http://localhost:5000/graphql'
const wsUrl = 'ws://localhost:5000/graphql'

// http link
const httpLink = new HttpLink({
  uri: graphqlUrl,
  credentials: 'include',
})

//websockets link
const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: wsUrl,
        })
      )
    : null

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
  link: link,
  cache: new InMemoryCache(),
  credentials: 'include',
  ssrMode: true,
})

export default apolloClient
