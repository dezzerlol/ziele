import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateProjectDto } from './dto/create-project.dto'

@Injectable()
export class ProjectService {
  constructor(private prismaService: PrismaService) {}

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

  async getProject(id: number) {
    return this.prismaService.project.findUnique({
      where: { id },
      include: { users: true },
    })
  }

  async getUserProjects(userId: number) {
    return this.prismaService.project.findMany({
      where: {
        users: {
          every: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
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
