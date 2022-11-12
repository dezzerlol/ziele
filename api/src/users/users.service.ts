import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ICurrentUser } from './user.decorator'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(currentUser: ICurrentUser) {
    const user = await this.prisma.user.findUnique({
      where: { id: currentUser.id },
      select: {
        id: true,
        email: true,
        avatar: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        projects: true,
        teams: {
          include: {
            projects: {
              include: {
                team: true,
              },
            },
          },
        },
      },
    })
    return user
  }

  async createUser(data: CreateUserDto) {
    return this.prisma.user.create({ data })
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    return user
  }

  async findUsersByUsername(usernames: string[]) {
    const users = await this.prisma.user.findMany({
      where: { username: { in: usernames } },
    })
    return users
  }

  async findUserByUsername(username: string) {
    const user = await this.prisma.user.findUnique({ where: { username } })
    return user
  }

  async getAllUsers() {
    return await this.prisma.user.findMany()
  }

  async getUserProjects(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { projects: { select: { id: true, title: true } } },
    })
    return user.projects
  }

  async getUserTeams(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { teams: true },
    })
    return user.teams
  }
}
