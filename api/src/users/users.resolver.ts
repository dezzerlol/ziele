import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard'
import { CurrentUser, ICurrentUser } from './user.decorator'
import { User } from './users.model'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async getAccount(@CurrentUser() reqUser: ICurrentUser) {
    return this.usersService.getUser(reqUser)
  }
}
