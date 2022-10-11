import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { UsersService } from 'src/users/users.service'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async login(data: LoginDto) {
    const user = await this.validateUser(data)
    return this.generateToken(user)
  }

  async register(data: CreateUserDto) {
    const isExist = await this.userService.findUserByEmail(data.email)

    if (isExist) {
      throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST)
    }

    const hashedPassword = await bcrypt.hash(data.password, 6)

    const user = await this.userService.createUser({ ...data, password: hashedPassword })

    return { status: HttpStatus.CREATED, message: 'ok' }
  }

  validateToken(token: string) {
    try {
      const user = this.jwtService.verify(token)
      return user
    } catch (error) {
      throw new UnauthorizedException({ message: 'User not authorized' })
    }
  }

  private async validateUser(data: LoginDto) {
    const user = await this.userService.findUserByEmail(data.email)

    if (!user) {
      throw new UnauthorizedException({ message: 'User not found' })
    }

    //compare passwords
    const isPassEqual = await bcrypt.compare(data.password, user.password)

    // is pass equal return user object without password
    if (user && isPassEqual) {
      // const { password, ...result } = user
      return user
    } else {
      throw new UnauthorizedException({
        message: 'Password incorrect',
      })
    }
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id }

    return {
      token: this.jwtService.sign(payload),
    }
  }
}
