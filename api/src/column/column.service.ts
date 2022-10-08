import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateColumnDto } from './dto/create-column.dto'

@Injectable()
export class ColumnService {
  constructor(private prisma: PrismaService) {}

  async createColumn(data: CreateColumnDto) {
    const column = await this.prisma.column.create({
      data: {
        title: data.title,
        Project: {
          connect: {
            id: data.projectId,
          },
        },
      },
    })
    return column
  }

  async getProjectColumns(projectId: number) {
    const columns = await this.prisma.column.findMany({
      where: {
        projectId: projectId,
      },
    })
    return columns
  }
}
