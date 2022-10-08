import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    console.log(req)

    try {
      const authHeader = req.headers.authorization

      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User not authorized' })
      }

      const user = this.jwtService.verify(token)
      req.user = user
      return true
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException({ message: 'User not authorized' })
    }
  }
}

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }

  canActivate(context: ExecutionContext) {
    //get request
    const req = this.getRequest(context);

    // Get the header
    const authHeader = context.getArgs()[2].req.headers.authorization as string

    if (!authHeader) {
      throw new BadRequestException('Authorization header not found.')
    }

    const [type, token] = authHeader.split(' ')
    if (type !== 'Bearer') {
      throw new BadRequestException(`Authentication type \'Bearer\' required. Found \'${type}\'`)
    }
    const validationResult = this.auth.validateToken(token)

    if (validationResult) {
      // send token in request user
      req.user = validationResult
      return true
    }
    
    throw new UnauthorizedException(validationResult)
  }
}

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  canActivate(context: ExecutionContext) {
    // Since a GraphQl subscription uses Websockets,
    // we can't pass any headers. So we pass the token inside the query itself
    const token = context.switchToWs().getData().token

    if (!token) {
      throw new BadRequestException('Authentication token not found.')
    }

    const validationResult = this.auth.validateToken(token)
    if (validationResult === true) {
      return true
    }
    throw new UnauthorizedException(validationResult)
  }
}
