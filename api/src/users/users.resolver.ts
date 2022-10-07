import { Query, Resolver } from '@nestjs/graphql'
import { User } from './users.model'
import { UsersService } from './users.service'

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async getAllUsers() {
    return this.usersService.getAllUsers()
  }
}
