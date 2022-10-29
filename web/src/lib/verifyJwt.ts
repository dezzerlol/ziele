import { jwtVerify } from 'jose'

export async function verifyJwt(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY))
    // run some checks on the returned payload, perhaps you expect some specific values
    // if its all good, return it, or perhaps just return a boolean
    return payload
  } catch (error) {}
}
