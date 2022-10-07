import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { OutputLogin, OutputRegister } from './dto/output.dto'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => OutputLogin)
  login(@Args('data') data: LoginDto): Promise<OutputLogin> {
    return this.authService.login(data)
  }

  @Mutation(() => OutputRegister)
  register(@Args('data') data: CreateUserDto): Promise<OutputRegister> {
    return this.authService.register(data)
  }
}
