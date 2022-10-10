import { BadRequestException, CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
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
      const projectId = args.data.projectId
      const userId = validationResult.id

      // check if user exists in requested project,
      // if exists return true
      const isUserInProject = await this.projectService.findUserInProject({ userId, projectId })
     /*  console.log(isUserInProject) */
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
