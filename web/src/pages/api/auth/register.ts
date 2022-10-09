import { gql } from '@apollo/client'
import { serialize } from 'cookie'
import { decodeJwt, jwtDecrypt } from 'jose'
import { NextApiRequest, NextApiResponse } from 'next'
import apolloClient from '../../../lib/apolloClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, username } = req.body

  const { data } = await apolloClient.mutate({
    mutation: gql`
      mutation register($data: CreateUserDto!) {
        register(data: $data) {
          status
          message
        }
      }
    `,
    variables: { data: { email, password, username } },
  })

  return res.status(data.register.status).json(data)
}
