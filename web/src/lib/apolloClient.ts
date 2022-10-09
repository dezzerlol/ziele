import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

const graphqlUrl = 'http://localhost:5000/graphql'
const wsUrl = 'ws://localhost:5000/graphql'

const httpLink = new HttpLink({
  uri: graphqlUrl,
})

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
})

export default apolloClient
