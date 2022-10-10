import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateColumnDto } from './dto/create-column.dto'
import { GetColumnsDto } from './dto/get-columns.dto'

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

  async getProjectColumns(data: GetColumnsDto) {
    const columns = await this.prisma.column.findMany({
      where: {
        projectId: data.projectId,
      },
      include: {
        cards: true,
      },
    })
    return columns
  }

  async updateColumn(id: number, newTitle: string) {
    const column = await this.prisma.column.update({
      where: {
        id,
      },
      data: {
        title: newTitle,
      },
    })

    return column
  }
}
