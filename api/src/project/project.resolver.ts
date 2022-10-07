import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateProjectDto } from './dto/create-project.dto'
import { Project } from './project.model'
import { ProjectService } from './project.service'

/* @UseGuards(JwtAuthGuard) */
@Resolver()
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @Mutation(() => Project)
  async createProject(@Args('data') data: CreateProjectDto) {
    return this.projectService.createProject(data)
  }
}
