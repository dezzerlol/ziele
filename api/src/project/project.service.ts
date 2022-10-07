import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateProjectDto } from './dto/create-project.dto'

@Injectable()
export class ProjectService {
  constructor(private prismaService: PrismaService) {}

  async createProject(data: CreateProjectDto) {
    return this.prismaService.project.create({
      data: {
        title: data.title,
        users: {
          connect: { id: data.userId },
        },
      },
    })
  }
}
