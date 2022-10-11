import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import { AUTH_TOKEN } from '../../../constant'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    'Set-Cookie',
    serialize(AUTH_TOKEN, 'false', {
      httpOnly: true,
      maxAge: 0,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  )
  res.redirect('/login')
}
