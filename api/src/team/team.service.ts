import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateProjectDto } from 'src/project/dto/create-project.dto'
import { ProjectService } from 'src/project/project.service'
import { ICurrentUser } from 'src/users/user.decorator'
import { UsersService } from 'src/users/users.service'
import { AddUserToTeamDto } from './dto/add-user.dto'
import { CreateTeamDto } from './dto/create-team.dto'

@Injectable()
export class TeamService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
    @Inject(forwardRef(() => ProjectService)) private projectService: ProjectService
  ) {}

  async getTeam(title: string, reqUser?: ICurrentUser, offset = 0) {
    // get team
    const team = await this.prismaService.team.findUnique({
      where: { title },
      include: {
        users: { select: { id: true, username: true, email: true, avatar: true }, take: 15, skip: offset },
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

    // if no team throw error
    if (!team) {
      throw new HttpException('Team not found', HttpStatus.BAD_REQUEST)
    }

    return team
  }

  async getUserTeams(reqUser: ICurrentUser) {
    const teams = await this.usersService.getUserTeams(reqUser.id)
    return teams
  }

  async createTeam(data: CreateTeamDto, userId: string) {
    // get team with this title
    const isExistTeam = await this.prismaService.team.findUnique({ where: { title: data.title } })

    // if exists throw error
    if (isExistTeam) {
      throw new HttpException('Name already taken.', HttpStatus.BAD_REQUEST)
    }

    // get users with requested ids
    const findUsers = await this.usersService.findUsersByUsername(data.users)
    // add current user to users array
    const allUsers = [userId, ...findUsers.map((u) => u.id)]

    // create team and connect users
    const team = await this.prismaService.team.create({
      data: {
        title: data.title,
        users: {
          connect: allUsers.map((u) => ({ id: u })),
        },
      },
    })

    const newProject: CreateProjectDto = {
      teamId: team.id,
      title: 'Your first project.',
    }

    // create default project
    const project = await this.projectService.createProject(newProject, userId)

    return team
  }

  async addUserInTeam(data: AddUserToTeamDto) {
    const user = await this.prismaService.user.findUnique({ where: { username: data.username } })

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }

    const addedToTeam = await this.prismaService.team.update({
      where: { id: data.teamId },
      data: {
        users: {
          connect: { id: user.id },
        },
      },
    })

    return addedToTeam
  }

  async removeUserFromTeam(data: AddUserToTeamDto) {
    const team = await this.prismaService.team.update({
      where: { id: data.teamId },
      data: {
        users: {
          disconnect: { username: data.username },
        },
      },
    })

    const removedFromProjects = await this.projectService.removeUserFromProjects({
      username: data.username,
      teamId: data.teamId,
    })

    return { status: HttpStatus.OK, message: 'ok' }
  }

  async findUserInTeam(data: { userId: string; teamTitle: string }) {
    const teams = await this.usersService.getUserTeams(data.userId)

    if (teams.some((p) => p.title === data.teamTitle)) {
      return true
    } else {
      return false
    }
  }
}
