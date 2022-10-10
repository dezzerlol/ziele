import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ICurrentUser } from 'src/users/user.decorator'
import { UsersService } from 'src/users/users.service'
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
      },
    })
  }

  async addUserToProject(id: number, userId: number) {
    const users = this.prismaService.user.findUnique({ where: { id: userId } })

    if (!users) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }

    return this.prismaService.project.update({
      where: { id },
      data: {
        users: {
          connect: { id: 1 },
        },
      },
    })
  }
}
