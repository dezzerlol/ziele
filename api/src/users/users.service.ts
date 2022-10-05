import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user
  }
}
