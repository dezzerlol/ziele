import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard'
import { DefaultResponse } from 'src/common/defaultResponse.dto'
import { CurrentUser, ICurrentUser } from 'src/users/user.decorator'
import { AddUserToTeamDto } from './dto/add-user.dto'
import { CreateTeamDto } from './dto/create-team.dto'
import { TeamGuard } from './team.guard'
import { Team } from './team.model'
import { TeamService } from './team.service'

@Resolver()
@UseGuards(GqlAuthGuard)
export class TeamResolver {
  constructor(private teamService: TeamService) {}

  @UseGuards(TeamGuard)
  @Query(() => Team)
  async getTeam(
    @Args('title') title: string,
    @CurrentUser() reqUser: ICurrentUser,
    @Args('offset', { type: () => Int, nullable: true, defaultValue: 0 }) offset?: number
  ) {
    return this.teamService.getTeam(title, reqUser, offset)
  }

  @Query(() => [Team])
  async getUserTeams(@CurrentUser() reqUser: ICurrentUser) {
    return this.teamService.getUserTeams(reqUser)
  }

  @Mutation(() => Team)
  async createTeam(@Args('data') data: CreateTeamDto, @CurrentUser() reqUser: ICurrentUser) {
    return this.teamService.createTeam(data, reqUser.id)
  }

  @Mutation(() => Team)
  async addUserInTeam(@Args('data') data: AddUserToTeamDto) {
    return this.teamService.addUserInTeam(data)
  }

  @Mutation(() => DefaultResponse)
  async removeUserFromTeam(@Args('data') data: AddUserToTeamDto) {
    return this.teamService.removeUserFromTeam(data)
  }
}
