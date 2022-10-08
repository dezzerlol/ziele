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

  @Mutation(() => Project)
  async createProject(@Args('data') data: CreateProjectDto, @CurrentUser() user: ICurrentUser) {
    return this.projectService.createProject(data, user.id)
  }

  @Query(() => Project)
  async getProject(@Args('id') id: number, @CurrentUser() user: ICurrentUser) {
    console.log({ user })
    return this.projectService.getProject(id)
  }

  @Query(() => [Project])
  async getUserProjects(@CurrentUser() user: ICurrentUser) {
    return this.projectService.getUserProjects(user.id)
  }
}
