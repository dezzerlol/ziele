import { gql } from '@apollo/client'
import { serialize } from 'cookie'
import { decodeJwt } from 'jose'
import { NextApiRequest, NextApiResponse } from 'next'
import apolloClient from '../../../lib/apolloClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, username } = req.body

  try {
    const { data, errors } = await apolloClient.mutate({
      mutation: gql`
        mutation login($data: LoginDto!) {
          login(data: $data) {
            token
          }
        }
      `,
      variables: { data: { email, password } },
    })

    const payload = decodeJwt(data.login.token)
    const expTime = new Date((payload.exp as number) * 1000)

    res.setHeader(
      'Set-Cookie',
      serialize('ZIELE_AUTH_TOKEN', data.login.token, {
        httpOnly: true,
        expires: expTime,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      })
    )

    return res.status(200).json({ token: data.login.token })
  } catch (error: any) {
    console.log(error.graphQLErrors[0])
    return res.status(401).json({ message: error.graphQLErrors[0].message })
  }
}
