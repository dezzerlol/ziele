import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard'
import { DefaultResponse } from 'src/common/defaultResponse.dto'
import { CurrentUser, ICurrentUser } from 'src/users/user.decorator'
import { AddUserDto } from './dto/add-user.dto'
import { CreateProjectDto } from './dto/create-project.dto'
import { CreateTagDto } from './dto/create-tag.dto'
import { Project } from './project.model'
import { ProjectService } from './project.service'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @Query(() => Project)
  async getProject(
    @Args('teamTitle') teamTitle: string,
    @Args('projectId') projectId: string,
    @CurrentUser() reqUser: ICurrentUser
  ) {
    return this.projectService.getProject(teamTitle, projectId, reqUser)
  }

  /* @Query(() => [Project])
  async getTeamProjects(@Args('teamId') teamId: string, @CurrentUser() reqUser: ICurrentUser) {
    return this.projectService.getTeamProjects(reqUser)
  } */

  @Query(() => [Project])
  async getUserProjects(@CurrentUser() reqUser: ICurrentUser) {
    return this.projectService.getUserProjects(reqUser)
  }

  @Mutation(() => Project)
  async addUserInProject(@Args('data') data: AddUserDto) {
    return this.projectService.addUserToProject(data)
  }

  @Mutation(() => Project)
  async createProject(@Args('data') data: CreateProjectDto, @CurrentUser() reqUser: ICurrentUser) {
    return this.projectService.createProject(data, reqUser.id)
  }

  @Mutation(() => DefaultResponse)
  async createCardTag(@Args('data') data: CreateTagDto, @CurrentUser() reqUser: ICurrentUser) {
    return this.projectService.createCardTag(data)
  }
}
