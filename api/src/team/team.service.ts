import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ICurrentUser } from 'src/users/user.decorator'
import { UsersService } from 'src/users/users.service'
import { AddUserToTeamDto } from './dto/add-user.dto'
import { CreateTeamDto } from './dto/create-team.dto'

@Injectable()
export class TeamService {
  constructor(private prismaService: PrismaService, private usersService: UsersService) {}

  async getTeam(title: string, reqUser: ICurrentUser) {
    // get project
    const team = await this.prismaService.team.findUnique({
      where: { title },
      include: {
        users: { select: { id: true, username: true, email: true, avatar: true } },
        _count: { select: { users: true } },
        projects: {
          include: {
            users: { select: { id: true, avatar: true, username: true }, take: 3 },
            columns: {
              include: {
                cards: {
                  include: {
                    tags: true,
                  },
                },
              },
            },
            tags: true,
            _count: {
              select: { users: true },
            },
          },
        },
      },
    })

    if (!team) {
      throw new HttpException('Team not found', HttpStatus.BAD_REQUEST)
    }

    // check if user is in project and return project
    // else throw forbidden error
    if (team.users.some((u) => u.id === reqUser.id)) {
      return team
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
  }

  async getUserTeams(reqUser: ICurrentUser) {
    const teams = await this.usersService.getUserTeams(reqUser.id)
    return teams
  }

  async createTeam(data: CreateTeamDto, userId: string) {
    return this.prismaService.team.create({
      data: {
        title: data.title,
        users: {
          connect: {
            id: userId,
          },
        },
      },
    })
  }

  async addUserInTeam(data: AddUserToTeamDto) {
    const user = await this.prismaService.user.findUnique({ where: { username: data.username } })

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }

    const addedToTeam = await this.prismaService.project.update({
      where: { id: data.teamId },
      data: {
        users: {
          connect: { id: user.id },
        },
      },
    })

    return addedToTeam
  }
}
