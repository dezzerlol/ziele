import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { ColumnService } from 'src/column/column.service'
import { CreateColumnDto } from 'src/column/dto/create-column.dto'
import { DefaultResponse } from 'src/common/defaultResponse.dto'
import { PrismaService } from 'src/prisma.service'
import { TeamService } from 'src/team/team.service'
import { ICurrentUser } from 'src/users/user.decorator'
import { UsersService } from 'src/users/users.service'
import { AddUserDto } from './dto/add-user.dto'
import { CreateProjectDto } from './dto/create-project.dto'
import { CreateTagDto } from './dto/create-tag.dto'
import { colors } from './tag.model'

@Injectable()
export class ProjectService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
    @Inject(forwardRef(() => TeamService)) private teamService: TeamService,
    @Inject(forwardRef(() => ColumnService)) private columnService: ColumnService
  ) {}

  async getProject(teamTitle: string, projectId: string, reqUser: ICurrentUser) {
    // get team
    const team = await this.teamService.getTeam(teamTitle, reqUser)

    const project = team.projects.find((p) => p.id === projectId)

    if (!project) {
      throw new HttpException('Project not found', HttpStatus.BAD_REQUEST)
    }

    // check if user is in project and return project
    // else throw forbidden error
    if (project.users.some((u) => u.id === reqUser.id)) {
      return project
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
  }

  async getUserProjects(reqUser: ICurrentUser) {
    const projects = await this.usersService.getUserProjects(reqUser.id)
    return projects
  }

  async findUserInProject(data: { userId: string; projectId: string }) {
    const projects = await this.usersService.getUserProjects(data.userId)

    if (projects.some((p) => p.id === data.projectId)) {
      return true
    } else {
      return false
    }
  }

  async createProject(data: CreateProjectDto, userId: string) {
    const project = await this.prismaService.project.create({
      data: {
        title: data.title,
        users: {
          connect: { id: userId },
        },
        team: {
          connect: { id: data.teamId },
        },
      },
    })

    const firstColumn: CreateColumnDto = {
      projectId: project.id,
      title: 'To do',
    }

    const column = await this.columnService.createColumn(firstColumn)

    return project
  }

  async addUserToProject(data: AddUserDto) {
    const user = await this.prismaService.user.findUnique({ where: { username: data.username } })

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }

    const addedToProject = await this.prismaService.project.update({
      where: { id: data.projectId },
      data: {
        users: {
          connect: { id: user.id },
        },
      },
    })

    return addedToProject
  }

  async removeUserFromProject(data: AddUserDto) {
    const removedFromProject = await this.prismaService.project.update({
      where: { id: data.projectId },
      data: {
        users: {
          disconnect: { username: data.username },
        },
      },
    })
    return removedFromProject
  }

  async removeUserFromProjects(data: { username: string; teamId: string }) {
    const projects = await this.prismaService.project.findMany({
      where: {
        teamId: data.teamId,
      },
      select: {
        id: true,
        users: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    })

    // https://github.com/prisma/prisma/issues/3143
    await Promise.all(
      projects.map((p) => {
        return this.prismaService.project.update({
          where: {
            id: p.id,
          },

          data: {
            users: {
              disconnect: {
                username: data.username,
              },
            },
          },
        })
      })
    )

    return { status: HttpStatus.OK, message: 'ok' }
  }

  async createCardTag(data: CreateTagDto): Promise<DefaultResponse> {
    let tag

    if (!colors.includes(data.color)) {
      throw new HttpException('Invalid color', HttpStatus.BAD_REQUEST)
    }

    try {
      tag = await this.prismaService.tag.create({
        data,
      })
    } catch (error) {
      throw new HttpException('Tag with this name already exists', HttpStatus.BAD_REQUEST)
    }

    const connectTag = await this.prismaService.project.update({
      where: { id: data.projectId },
      data: {
        tags: {
          connect: { id: tag.id },
        },
      },
    })
    return { status: HttpStatus.CREATED, message: 'ok' }
  }
}
