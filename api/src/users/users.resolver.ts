import { Query, Resolver } from '@nestjs/graphql'
import { User } from './users.model'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}
}
