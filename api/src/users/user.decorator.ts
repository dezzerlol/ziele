import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export interface ICurrentUser {
  id: number
  email: string
  iat: number
  exp: number
}

// decorator to get decoded jwt token from request,
// use it as argument in a mutation or query
export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)
  return ctx.getContext().req.user
})
