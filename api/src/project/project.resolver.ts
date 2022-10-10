import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard'
import { CurrentUser, ICurrentUser } from 'src/users/user.decorator'
import { CreateProjectDto } from './dto/create-project.dto'
import { Project } from './project.model'
import { ProjectService } from './project.service'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @Query(() => Project)
  async getProject(@Args('id') id: number, @CurrentUser() reqUser: ICurrentUser) {
    return this.projectService.getProject(id, reqUser)
  }

  @Query(() => [Project])
  async getUserProjects(@CurrentUser() reqUser: ICurrentUser) {
    return this.projectService.getUserProjects(reqUser)
  }

  /* @Query(() => Boolean)
  async findUserInProject(@Args('data') data: FindUserDto) {
    return this.projectService.findUserInProject(data)
  } */

  @Mutation(() => Project)
  async createProject(@Args('data') data: CreateProjectDto, @CurrentUser() reqUser: ICurrentUser) {
    return this.projectService.createProject(data, reqUser.id)
  }
}
