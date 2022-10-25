import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthService } from 'src/auth/auth.service'
import { ProjectService } from './project.service'

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(private readonly auth: AuthService, private readonly projectService: ProjectService) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }

  getArgs(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getArgs()
  }

  async canActivate(context: ExecutionContext) {
    //get request
    const req = this.getRequest(context)
    const args = this.getArgs(context)

    // Get the token from cookie
    const AUTH_TOKEN = context.getArgs()[2].req.cookies.ZIELE_AUTH_TOKEN

    if (!AUTH_TOKEN) {
      throw new BadRequestException('Authorization token not found.')
    }

    const validationResult = this.auth.validateToken(AUTH_TOKEN)

    if (validationResult) {
      // projectId can be passed in args data object or directly in args
      const projectId = args.data ? args.data.projectId : args.projectId
      const userId = validationResult.id

      // check if user exists in requested project,
      // if exists return true
      const isUserInProject = await this.projectService.findUserInProject({ userId, projectId })

      if (isUserInProject) {
        req.user = validationResult
        return true
      } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
      }
    }

    throw new UnauthorizedException(validationResult)
  }
}
