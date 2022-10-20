import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ICurrentUser } from 'src/users/user.decorator'
import { UsersService } from 'src/users/users.service'
import { AddUserDto } from './dto/add-user.dto'
import { CreateProjectDto } from './dto/create-project.dto'

@Injectable()
export class ProjectService {
  constructor(private prismaService: PrismaService, private usersService: UsersService) {}

  async getProject(id: number, reqUser: ICurrentUser) {
    // get project
    const project = await this.prismaService.project.findUnique({
      where: { id },
      include: { users: { select: { id: true, username: true, email: true, avatar: true } } },
    })

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

  async findUserInProject(data: { userId: number; projectId: number }) {
    const projects = await this.usersService.getUserProjects(data.userId)

    if (projects.some((p) => p.id === data.projectId)) {
      return true
    } else {
      return false
    }
  }

  async createProject(data: CreateProjectDto, userId: number) {
    return this.prismaService.project.create({
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
}
